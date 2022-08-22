import os
import json
import leetcode
import leetcode.auth
from datetime import datetime
from leetcode.rest import ApiException


def create_leetcode_api():
    LEETCODE_SESSION_TOKEN = os.environ.get("LEETCODE_SESSION_TOKEN")
    csrf_token = leetcode.auth.get_csrf_cookie(LEETCODE_SESSION_TOKEN)

    configuration = leetcode.Configuration()

    configuration.api_key["x-csrftoken"] = csrf_token
    configuration.api_key["csrftoken"] = csrf_token
    configuration.api_key["LEETCODE_SESSION"] = LEETCODE_SESSION_TOKEN
    configuration.api_key["Referer"] = "https://leetcode.com"
    configuration.debug = False

    return leetcode.DefaultApi(leetcode.ApiClient(configuration))


def get_question_metadata(api, title_slug):
    graphql_request = leetcode.GraphqlQuery(
        query='''query questionData($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                title
                difficulty
                companyTagStats
                isPaidOnly
            }
        }
        ''',
        variables=leetcode.GraphqlQueryGetQuestionDetailVariables(
            title_slug=title_slug)
    )

    try:
        response = api.graphql_post(body=graphql_request)
        return response
    except ApiException as e:
        print(
            f'Exception occurred when contacting the Leetcode GraphQL API: ${e}')
        exit()


def construct_company_tag_list(company_tags_json, sections):
    companies = []

    for section in sections:
        for company in company_tags_json[section]:
            companies.append({
                "name": company["name"],
                "slug": company["slug"],
                "frequency": company["timesEncountered"]
            })

    return sorted(companies, key=lambda d: d['frequency'], reverse=True)


def update_question_metadata(question, response):
    print(f'''🔄 Updating question metadata for {question["title"]}''')

    question_title = response.data.question.title
    question_difficulty = response.data.question.difficulty
    question_company_tags = json.loads(
        response.data.question.company_tag_stats)
    question_is_premium = response.data.question.is_paid_only

    # Retrieve companies who have asked this question for the following two
    # company_tag_stat sections:
    #   1. 0-6 months
    #   2. 6 months to 1 year
    companies = construct_company_tag_list(
        question_company_tags, ["1", "2"])

    question["title"] = question_title
    question["difficulty"] = question_difficulty
    question["companies"] = companies
    question["premium"] = question_is_premium


def read_questions(file_name):
    print(f"💾 Loading {file_name}")

    try:
        with open(file_name, "r") as file:
            questions = json.load(file)
            print(f"✅ Finished loading {file_name}")
            return questions
    except Exception as e:
        print(
            f"❌ Exception occurred when reading {file_name}: {e}")
        exit()


def write_questions(file_name, questions):
    print(f"💾 Updating {file_name}")

    try:
        with open(file_name, "w") as file:
            questions["updated"] = str(datetime.now().isoformat())
            json.dump(questions, file, indent=2)
            print(f"✅ Finished updating {file_name}")
    except Exception as e:
        print(
            f"❌ Exception occurred when writing {file_name}: {e}")
        exit()


def main(file_name):
    api = create_leetcode_api()
    questions = read_questions(file_name)

    for question in questions["data"]:
        title_slug = question["slug"]

        response = get_question_metadata(api, title_slug)

        update_question_metadata(question, response)

    write_questions(file_name, questions)


if __name__ == "__main__":
    file_name = os.getcwd() + "/src/data/questions.json"
    startTime = datetime.now()

    main(file_name)

    print(f"⏱️  Data updated in {datetime.now() - startTime} seconds")

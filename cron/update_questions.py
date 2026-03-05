import os
import json
import leetcode
import leetcode.auth
from datetime import datetime
from leetcode.rest import ApiException


def create_leetcode_api():
    leetcode_session_token = os.environ.get("LEETCODE_SESSION_TOKEN")
    csrf_token = os.environ.get("LEETCODE_CSRF_TOKEN")
    cf_clearance = os.environ.get("LEETCODE_CF_CLEARANCE")

    if not leetcode_session_token:
        print("❌ LEETCODE_SESSION_TOKEN environment variable is required")
        exit(1)

    if not csrf_token:
        print("❌ LEETCODE_CSRF_TOKEN environment variable is required")
        exit(1)

    if not cf_clearance:
        print("❌ LEETCODE_CF_CLEARANCE environment variable is required")
        exit(1)

    configuration = leetcode.Configuration()

    configuration.api_key["x-csrftoken"] = csrf_token
    configuration.api_key["csrftoken"] = csrf_token
    configuration.api_key["LEETCODE_SESSION"] = leetcode_session_token
    configuration.api_key["cf_clearance"] = cf_clearance
    configuration.api_key["Referer"] = "https://leetcode.com"
    configuration.debug = False

    return leetcode.DefaultApi(leetcode.ApiClient(configuration))


def get_question_metadata(api, title_slug):
    graphql_request = leetcode.GraphqlQuery(
        query='''query questionData($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                questionId
                title
                difficulty
                companyTagStatsV2
                isPaidOnly
            }
        }
        ''',
        variables=leetcode.GraphqlQueryGetQuestionDetailVariables(
            title_slug=title_slug)
    )

    try:
        response = api.graphql_post(body=graphql_request)
        if not response.data.question:
            print(f'❌ Empty response body for question: {title_slug}')
            exit(1)
        return response
    except ApiException as e:
        print(
            f'Exception occurred when contacting the Leetcode GraphQL API: ${e}')
        exit()


def construct_company_tag_list(company_tag_stats_v2):
    companies = []

    tag_stats = json.loads(company_tag_stats_v2)
    for tag in tag_stats["three_months"]:
        # Number of times the question was asked by this company in the past 0-3 months
        companies.append({
            "name": tag["name"],
            "slug": tag["slug"],
            "frequency": tag["timesEncountered"]
        })

    return sorted(companies, key=lambda d: d['frequency'], reverse=True)


def update_question_metadata(question, response):
    print(f'''🔄 Updating question metadata for {question["title"]}''')

    question_title = response.data.question.title
    question_difficulty = response.data.question.difficulty
    question_company_tag_stats_v2 = response.data.question.company_tag_stats_v2
    question_is_premium = response.data.question.is_paid_only

    companies = construct_company_tag_list(question_company_tag_stats_v2)

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

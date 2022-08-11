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
    except ApiException as e:
        print(
            f'Exception occurred when contacting the Leetcode GraphQL API: ${e}')
        exit()

    return response


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


def update_question_metadata(question, title, difficulty, companies, is_premium):
    question["title"] = title
    question["difficulty"] = difficulty
    question["companies"] = companies
    question["premium"] = is_premium


def read_questions(file_name):
    print("=== Reading questions file ===")

    try:
        with open(file_name, "r") as file:
            questions = json.load(file)
            return questions["data"]
    except Exception as e:
        print(
            f'Exception occurred when reading questions.json: ${e}')
        exit()


def write_questions(file_name, data):
    try:
        with open(file_name, "w") as file:
            data["updated"] = str(datetime.now().isoformat())
            json.dump(data, file, indent=2)
    except Exception as e:
        print(
            f'Exception occurred when writing questions.json: ${e}')
        exit()

    print("=== Wrote questions file ===")


def main(file_name):
    api = create_leetcode_api()
    questions = read_questions(file_name)

    for question in questions:
        title_slug = question["slug"]

        response = get_question_metadata(api, title_slug)

        question_title = response.data.question.title
        question_difficulty = response.data.question.difficulty
        question_company_tags = json.loads(
            response.data.question.company_tag_stats)
        question_is_premium = response.data.question.is_paid_only

        # Retrieve companies who have asked this question within the following two
        # company_tag_stat sections:
        #   1. 0-6 months
        #   2. 6 months to 1 year
        companies = construct_company_tag_list(
            question_company_tags, ["1", "2"])

        update_question_metadata(question, question_title, question_difficulty,
                                 companies, question_is_premium)

    write_questions(file_name, questions)


if __name__ == "__main__":
    file_name = os.getcwd() + "/src/data/questions.json"
    startTime = datetime.now()

    main(file_name)

    print(f'=== Script took: {datetime.now() - startTime} seconds ===')

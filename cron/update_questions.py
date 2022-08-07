import os
import json
import leetcode
import leetcode.auth
from datetime import datetime

LEETCODE_SESSION_TOKEN = os.environ.get("LEETCODE_SESSION_TOKEN")

questions_file = os.getcwd() + "/src/data/questions.json"

print("=== Reading questions file ===")

try:
    with open(questions_file, "r") as file:
        questions = json.load(file)
except Exception as e:
    print(e)
    exit()

print("=== Updating question metadata ===")

startTime = datetime.now()

csrf_token = leetcode.auth.get_csrf_cookie(LEETCODE_SESSION_TOKEN)

configuration = leetcode.Configuration()

configuration.api_key["x-csrftoken"] = csrf_token
configuration.api_key["csrftoken"] = csrf_token
configuration.api_key["LEETCODE_SESSION"] = LEETCODE_SESSION_TOKEN
configuration.api_key["Referer"] = "https://leetcode.com"
configuration.debug = False

api_instance = leetcode.DefaultApi(leetcode.ApiClient(configuration))

for question in questions["data"]:
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
            title_slug=question["slug"])
    )

    response = api_instance.graphql_post(body=graphql_request).to_dict()

    leetcode_title = response["data"]["question"]["title"]
    leetcode_difficulty = response["data"]["question"]["difficulty"]
    leetcode_companyTags = json.loads(
        response["data"]["question"]["company_tag_stats"])
    leetcode_premium = response["data"]["question"]["is_paid_only"]

    # Retrieve companies who have asked this question within 0-1 year
    leetcode_companies = leetcode_companyTags["1"] + leetcode_companyTags["2"]

    companies = []

    for leetcode_company in leetcode_companies:
        companies.append({
            "name": leetcode_company["name"],
            "slug": leetcode_company["slug"],
            "frequency": leetcode_company["timesEncountered"]
        })

    companies = sorted(companies, key = lambda d: d['frequency'], reverse=True)

    question["title"] = leetcode_title
    question["difficulty"] = leetcode_difficulty
    question["companies"] = companies
    question["premium"] = leetcode_premium

print("=== Finished checking all questions ===")

try:
    with open(questions_file, "w") as file:
        questions["updated"] = str(datetime.now().isoformat())
        json.dump(questions, file, indent=2)
except Exception as e:
    print(e)
    exit()

print("=== Wrote questions file ===")
print(f'=== Script took: {datetime.now() - startTime} seconds ===')

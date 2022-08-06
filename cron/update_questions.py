import os
import json
from datetime import datetime
import leetcode
import leetcode.auth

LEETCODE_SESSION_TOKEN = os.environ.get("LEETCODE_SESSION_TOKEN")

questions_file = "../src/data/questions.json"

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
                difficulty
            }
        }
        ''',
        variables=leetcode.GraphqlQueryGetQuestionDetailVariables(title_slug=question["url"])
    )
    response = api_instance.graphql_post(body=graphql_request).to_dict()

    our_difficulty = question["difficulty"]
    leetcode_difficulty = response["data"]["question"]["difficulty"]

    if leetcode_difficulty != our_difficulty:
        print(f'{question["name"]}: {our_difficulty} -> {leetcode_difficulty}')
        question["difficulty"] = leetcode_difficulty

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

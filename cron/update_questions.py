import os
import json
import requests
from datetime import datetime

query = '''query questionData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    difficulty
  }
}
'''

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

for question in questions["data"]:
    variables = {"titleSlug": question["url"]}

    response = requests.post("https://leetcode.com/graphql",
        json={"query": query, "variables": variables}
    )

    our_difficulty = question["difficulty"]
    leetcode_difficulty = response.json()["data"]["question"]["difficulty"]

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

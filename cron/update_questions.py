import requests
from urllib.parse import urlparse
from datetime import datetime
import json

query = '''query questionData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    difficulty
  }
}
'''

print("Reading questions file")

with open("questions.json", "r") as file:
  questions = json.load(file)

print("Updating question metadata")

for question in questions["data"]:
    p = urlparse(question["url"])
    title_slug = p.path.rstrip('/').split('/')[-1]
    our_difficulty = question["difficulty"]
    variables = {"titleSlug": title_slug}

    response = requests.post("https://leetcode.com/graphql",
        json={"query": query, "variables": variables}
    )

    leetcode_difficulty = response.json()["data"]["question"]["difficulty"]

    if leetcode_difficulty != our_difficulty:
        print(f'{question["name"]}: {our_difficulty} -> {leetcode_difficulty}')
        question["difficulty"] = leetcode_difficulty

print("Finished checking all questions")

with open("questions.json", "w") as file:
  questions["updated"] = str(datetime.now().isoformat())
  json.dump(questions, file, indent=2)

print("Wrote questions file")

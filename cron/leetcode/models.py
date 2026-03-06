import json
import urllib.request

from leetcode.rest import ApiException


class Configuration:
    def __init__(self):
        self.host = "https://leetcode.com"
        self.api_key = {}
        self.debug = False


class GraphqlQuery:
    def __init__(self, query=None, variables=None, operation_name=None):
        self.query = query
        self.variables = variables
        self.operation_name = operation_name


class GraphqlQueryGetQuestionDetailVariables:
    def __init__(self, title_slug=None):
        self.title_slug = title_slug


class GraphqlQuestionDetail:
    def __init__(self, question_id=None, title=None, difficulty=None,
                 company_tag_stats_v2=None, is_paid_only=None, topic_tags=None):
        self.question_id = question_id
        self.title = title
        self.difficulty = difficulty
        self.company_tag_stats_v2 = company_tag_stats_v2
        self.is_paid_only = is_paid_only
        self.topic_tags = topic_tags


class GraphqlData:
    def __init__(self, question=None):
        self.question = question


class GraphqlResponse:
    def __init__(self, data=None):
        self.data = data


class ApiClient:
    def __init__(self, configuration=None):
        self.configuration = configuration or Configuration()


class DefaultApi:
    def __init__(self, api_client=None):
        self.api_client = api_client or ApiClient()

    def graphql_post(self, body=None):
        config = self.api_client.configuration

        variables = {}
        if body.variables and hasattr(body.variables, "title_slug"):
            variables["titleSlug"] = body.variables.title_slug

        payload = {"query": body.query, "variables": variables}
        if body.operation_name:
            payload["operationName"] = body.operation_name

        data = json.dumps(payload).encode("utf-8")

        cookie = (
            f"csrftoken={config.api_key.get('csrftoken') or ''}; "
            f"LEETCODE_SESSION={config.api_key.get('LEETCODE_SESSION') or ''}; "
            f"cf_clearance={config.api_key.get('cf_clearance') or ''}"
        )

        url = config.host + "/graphql"
        req = urllib.request.Request(url, data=data, method="POST")
        req.add_header("Content-Type", "application/json")
        req.add_header("Accept", "application/json")
        req.add_header("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36")
        req.add_header("x-csrftoken", config.api_key.get("x-csrftoken") or "")
        req.add_header("Referer", config.api_key.get("Referer") or "https://leetcode.com")
        req.add_header("Cookie", cookie)

        try:
            with urllib.request.urlopen(req) as resp:
                resp_data = json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            raise ApiException(
                status=e.code,
                reason=e.reason,
                body=e.read().decode("utf-8"),
            )

        question_data = resp_data.get("data", {}).get("question", {})

        topic_tags_raw = question_data.get("topicTags")
        topic_tags = [type("Tag", (), {"name": t["name"]}) for t in topic_tags_raw]

        question = GraphqlQuestionDetail(
            question_id=question_data.get("questionId"),
            title=question_data.get("title"),
            difficulty=question_data.get("difficulty"),
            company_tag_stats_v2=question_data.get("companyTagStatsV2"),
            is_paid_only=question_data.get("isPaidOnly"),
            topic_tags=topic_tags,
        )

        return GraphqlResponse(data=GraphqlData(question=question))

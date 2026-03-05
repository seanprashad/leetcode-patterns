class ApiException(Exception):
    def __init__(self, status=None, reason=None, body=None):
        self.status = status
        self.reason = reason
        self.body = body

    def __str__(self):
        msg = f"({self.status})\nReason: {self.reason}\n"
        if self.body:
            msg += f"HTTP response body: {self.body}\n"
        return msg

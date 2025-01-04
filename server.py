from http.server import SimpleHTTPRequestHandler, HTTPServer
from sys import argv


class RequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if (
            not self.path.endswith(".js")
            and not self.path.endswith(".html")
            and not self.path.endswith(".css")
            and not self.path.endswith(".webmanifest")
        ):
            self.path = "/index.html"
        return super().do_GET()


if len(argv) < 3 or not argv[2].isnumeric():
    print("WRONG USAGE!")
    print("server.py ip port")
else:
    server = HTTPServer((argv[1], int(argv[2])), RequestHandler)
    print(f"Server started at {argv[1]}:{argv[2]}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    server.server_close()

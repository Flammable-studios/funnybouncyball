import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Allow sound to be played
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

# Change to the script directory
os.chdir(Path(__file__).parent)

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"Server started at http://localhost:{PORT}")
    print("Opening in browser...")
    webbrowser.open(f"http://localhost:{PORT}")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")

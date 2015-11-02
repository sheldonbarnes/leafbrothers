import SimpleHTTPServer
import SocketServer

PORT = 80

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "Starting HTTP server 127.0.0.1", PORT
httpd.serve_forever();

brief description:
this application includes a https server -- "ssl_server" (using self signed certificates , generated using openssl command line) . which is acting as CA (certificate Authority) and
a app server which is our main server (handling client requests)


#openssl:
>to run below commands ,  you should first have to install openssl command line in your system 
*to generate private key with file name server-key.pem
    openssl genrsa -out server-key.pem 2048  
*to generate csr (certificate signing request) file use below command
    openssl req -new -sha256 -key server-key.pem -out csr.pem ://output: this will create a csr.pem file
*to create self signed certificate use below openssl command:
    openssl x509 -req -days 365 -in csr.pem -signkey server-key.pem -out server-cert.pem ://output this will create a self signed (with private key , server-key.pem) file (server-cert.pem)

#Warning:
since we are using self-signed certificates so browser(client) will show you warning of not secure CA.
if you want to remove this warning then do this : browser>settings>privacy&security>manage CA
now at this point import your local certificates to browser CA list

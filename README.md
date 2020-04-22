# One time file share
Easily generate one time link to share a file to any device with ngrok and qrcode in terminal, once the download is done your link is destroyed.

# How it works?
The program creates a temporary express server with a random available TCP port and creates a ngrok tunnel to expose this port over the internet. Once the file is downloaded the server is destroyed and the tunnel is closed.

# Installation
```
npm i -g onetime-file-share
```

# Usage
```
fshare <filepath>
```` 
![image](https://user-images.githubusercontent.com/14078661/80027429-218e9f80-84ba-11ea-8ed8-1415e1b16031.png)



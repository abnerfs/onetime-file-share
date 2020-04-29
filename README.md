# 📎 One time file share 
Easily generate one time link to share a file to any device with ngrok and qrcode in terminal, once the download is done your link is destroyed.

# 👨‍💻 How it works?
The program creates a temporary express server with a random available TCP port and creates a ngrok tunnel to expose this port over the internet. Once the file is downloaded the server is destroyed and the tunnel is closed.

# 🐧 Linux Installation 
Ngrok dependency requires extra options in Linux

```
sudo npm i -g onetime-file-share --unsafe-perm=true --allow-root
```

# ✅ Windows Installation
```
npm i -g onetime-file-share
```

# 🍏 MacOS Installation

Unfortunately not tested yet
```
npm i -g onetime-file-share
```

# 🚀 Usage
```
fshare <filepath>
```` 
![image](https://user-images.githubusercontent.com/14078661/80435518-1f21b080-88d3-11ea-8e03-a313f8f2e890.png)


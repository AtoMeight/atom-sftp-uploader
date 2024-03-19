# @atom/sftp-uploader

> Plugin for uploading files to a specified server

## Install

```sh
npm i @atom/sftp-uploader --save-dev
```

## Usage

```js
import AtomSftpUploader from '@atom/sftp-uploader';
// If you use CommonJS (i.e NodeJS environment), it should be:
// const { AtomSftpUploader } = require('@atom/sftp-uploader').default;

const sftpUploader = new AtomSftpUploader({
  host: 'your host',
  port: 'your port',
  username: 'your username',
  password: 'your password',
  from: 'you need upload file path',
  to: 'you want to destination',
});
sftpUploader.start();
```

## Configuration

The plugin allowed values are as follows:

- `port`: 服务器端口。
- `host`: 服务器地址。
- `username`: 服务器登陆用户名。
- `password`: 服务器登陆密码。
- `from`: 你需要上传的文件路径或者文件，其中对于文件，可以是文件路径的数组。
- `to`: 服务器上的目标路径。

## License

MIT © zhiyingzhou

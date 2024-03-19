import chalk from 'chalk';
import sftp, { default as Client } from 'ssh2-sftp-client';

interface AtomSftpUploaderOptions extends sftp.ConnectOptions {
  /**
   * 你需要上传的文件路径或者文件，其中对于文件，可以是文件路径的数组
   */
  from: string;
  /**
   * 服务器上的目标路径
   */
  to: string;
  filter?: sftp.DirFilterFunction;
}

class AtomSftpUploader {
  config: sftp.ConnectOptions = {};
  client: sftp;
  options: AtomSftpUploaderOptions;
  constructor(options: AtomSftpUploaderOptions) {
    this.config = {
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
    };
    this.options = options;
    this.client = new Client('AtomSftpUploader');
  }

  async upload() {
    try {
      this.client.on('upload', (info) => {
        console.log(chalk.green(`Uploaded ${info.source}`));
      });
      let rslt = await this.client.uploadDir(
        this.options.from,
        this.options.to,
        {
          filter: this.options.filter,
        },
      );
      console.log(' ')
      console.log(chalk.green('Upload file successful'))
      console.log(' ')
      return rslt;
    } catch (err) {
      console.error(err);
    }
  }

  async rmdir() {
    try {
      let rslt = await this.client.rmdir(this.options.to, true);
      console.log(chalk.green('Remove remote directory success'));
      return rslt;
    } catch (err) {
      console.error(err);
    }
  }

  async start() {
    await this.client.connect(this.config);
    console.log(chalk.green('Start upload files ...'));
    const exists = await this.client.exists(this.options.to);
    if (exists) {
      await this.rmdir();
    }
    await this.upload();
    this.client.end();
  }
}

export default AtomSftpUploader;

import paramiko
import time


try:
    # Create an SSH client
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    # Connect to the SFTP server
    ssh.connect(hostname, port=port, username=username, password=password)
    ssh.get_transport().set_keepalive(30)  # Sends keep-alive messages every 30 seconds
    stdin, stdout, stderr = ssh.exec_command('echo "Hello World"', timeout=300)
    # Read command output and errors
    # Read output line by line
    while not stdout.channel.closed:
        if stdout.channel.recv_ready():
            output = stdout.channel.recv(1024).decode('utf-8')
            print(output, end='')

        if stderr.channel.recv_ready():
            error = stderr.channel.recv(1024).decode('utf-8')
            print("Error:", error, end='')

        time.sleep(5)  # Prevent busy waiting

    # Final read for any remaining output
    if stdout.channel.recv_exit_status() is not None:  # Check if the command has completed
        output = stdout.read().decode('utf-8')
        print(output)

    if stderr.channel.recv_exit_status() is not None:
        error = stderr.read().decode('utf-8')
        print("Error:", error)

except Exception as e:
    print(f"Error: {e}")


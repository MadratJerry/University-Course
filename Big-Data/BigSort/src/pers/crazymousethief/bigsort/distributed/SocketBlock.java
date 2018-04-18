package pers.crazymousethief.bigsort.distributed;

import java.io.*;
import java.net.Socket;

public class SocketBlock {
    private Socket socket;
    private ObjectInputStream objectInputStream;
    private ObjectOutputStream objectOutputStream;
    private OutputStreamWriter outputStreamWriter;
    private InputStreamReader inputStreamReader;
    private BufferedWriter bufferedWriter;
    private BufferedReader bufferedReader;

    public SocketBlock(Socket socket) {
        this.socket = socket;
    }

    public Socket getSocket() {
        return socket;
    }

    public OutputStream getOutputStream() throws IOException {
        return socket.getOutputStream();
    }

    public InputStream getInputStream() throws IOException {
        return socket.getInputStream();
    }

    public ObjectInputStream getObjectInputStream() throws IOException {
        return objectInputStream == null ?
                objectInputStream = new ObjectInputStream(socket.getInputStream()) : objectInputStream;
    }

    public ObjectOutputStream getObjectOutputStream() throws IOException {
        return objectOutputStream == null ?
                objectOutputStream = new ObjectOutputStream(socket.getOutputStream()) : objectOutputStream;
    }

    public InputStreamReader getInputStreamReader() throws IOException {
        return inputStreamReader == null ?
                inputStreamReader = new InputStreamReader(socket.getInputStream()) : inputStreamReader;
    }

    public OutputStreamWriter getOutputStreamWriter() throws IOException {
        return outputStreamWriter == null ?
                outputStreamWriter = new OutputStreamWriter(socket.getOutputStream()) : outputStreamWriter;
    }

    public BufferedWriter getBufferedWriter() throws IOException {
        return bufferedWriter == null ?
                bufferedWriter = new BufferedWriter(getOutputStreamWriter()) : bufferedWriter;
    }

    public BufferedReader getBufferedReader() throws IOException {
        return bufferedReader == null ?
                bufferedReader = new BufferedReader(getInputStreamReader()) : bufferedReader;
    }
}

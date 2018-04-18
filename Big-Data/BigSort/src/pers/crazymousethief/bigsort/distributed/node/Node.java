package pers.crazymousethief.bigsort.distributed.node;

import pers.crazymousethief.bigsort.io.BufferInputStream;
import pers.crazymousethief.bigsort.io.util.Helper;
import pers.crazymousethief.bigsort.single.Single;

import java.io.*;
import java.net.Socket;

public class Node {
    private static final NodeBlock nodeBlock = new NodeBlock();

    public static void main(String[] args) throws IOException {
        var socket = new Socket("localhost", 17325);
        var stream = new BufferInputStream();
        try (var reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             var writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
             var output = new ObjectOutputStream(socket.getOutputStream())) {
            while (true) {
                String data;
                while ((data = reader.readLine()) != null) {
                    System.out.println(data);
                    switch (data) {
                        case "STATE":
                            output.writeObject(nodeBlock);
                            output.flush();
                            break;
                        case "START":
                            nodeBlock.setSocketState(NodeBlock.SocketState.RECEIVING);
                            new Thread(() -> {
                                try {
                                    Single.separate(3, stream);
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            }).start();
                            break;
                        case "END":
                            stream.flush();
                            nodeBlock.setSocketState(NodeBlock.SocketState.FREE);
                            break;
                        default:
                            if (nodeBlock.getSocketSocketState().equals(NodeBlock.SocketState.RECEIVING)) {
                                stream.write(data.concat("\n"));
                            }
                            break;
                    }
                }
                socket.sendUrgentData(0xff);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

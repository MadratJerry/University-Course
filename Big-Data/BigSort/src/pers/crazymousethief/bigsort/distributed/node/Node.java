package pers.crazymousethief.bigsort.distributed.node;

import java.io.*;
import java.net.Socket;

public class Node {
    public static void main(String[] args) throws IOException {
        var a = (int) (Math.random() * Integer.MAX_VALUE);
        var socket = new Socket("localhost", 17325);
        try (var reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
             var writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()))
        ) {
            var input = new BufferedReader(new InputStreamReader(System.in));
            String command;
            while ((command=input.readLine())!=null) {
                writer.write(command + "\n");
                writer.flush();
            }
        }
    }
}

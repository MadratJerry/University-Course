package pers.crazymousethief.bigsort.io;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.PriorityQueue;
import java.util.Queue;

public class SortOutputStream extends OutputStream {
    private long size;
    private StringBuilder sb = new StringBuilder();
    private Queue<Integer> pq = new PriorityQueue<>();
    private OutputStream stream;

    public SortOutputStream(long size, OutputStream stream) {
        this.size = size;
        this.stream = stream;
    }

    @Override
    public void write(int b) throws IOException {
        if (size == 0) {
            flush();
        } else if (b == '\n') {
            pq.add(Integer.parseInt(sb.toString()));
            sb = new StringBuilder();
            size--;
        } else {
            sb.append((char) b);
        }
    }

    public void flush() throws IOException {
        var writer = new BufferedWriter(new OutputStreamWriter(stream));
        while (!pq.isEmpty()) {
            writer.write(pq.poll().toString().concat("\n"));
        }
        writer.flush();
    }
}

package pers.crazymousethief.bigsort.io;

import java.io.*;
import java.util.*;

public class OrderedInputStream extends InputStream implements Iterable<String> {
    private Vector<BufferedReader> v;
    private Queue<BufferedReaderString> q;
    private Iterator<String> i;
    private String current = null;
    private int pos = 0;

    public OrderedInputStream(Vector<InputStream> v) throws IOException {
        this.v = new Vector<>();
        for (InputStream stream : v)
            this.v.add(new BufferedReader(new InputStreamReader(stream)));
        q = new PriorityQueue<>(v.size(), new Comparator<BufferedReaderString>() {
            @Override
            public int compare(BufferedReaderString o1, BufferedReaderString o2) {
                return Integer.parseInt(o1.getString()) - Integer.parseInt(o2.getString());
            }
        });
        for (BufferedReader reader : this.v)
            q.add(new BufferedReaderString(reader.readLine(), reader));
        i = iterator();
    }

    @Override
    public int read() throws IOException {
        if (current == null) {
            if (i.hasNext()) current = i.next();
            else return -1;
        }
        int result = current.charAt(pos++);
        if (pos >= current.length()) {
            pos = 0;
            current = null;
        }
        return result;
    }

    @Override
    public Iterator<String> iterator() {
        return new OrderedIterator();
    }

    private class OrderedIterator implements Iterator<String> {
        private BufferedReader source = null;
        private String number = null;

        @Override
        public boolean hasNext() {
            try {
                while (q.size() < v.size()) {
                    number = source.readLine();
                    if (number == null) v.remove(source);
                    else q.add(new BufferedReaderString(number, source));
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return !q.isEmpty();
        }

        @Override
        public String next() {
            if (!hasNext()) return null;
            BufferedReaderString brs = q.remove();
            source = brs.getSource();
            return brs.getString();
        }
    }
}


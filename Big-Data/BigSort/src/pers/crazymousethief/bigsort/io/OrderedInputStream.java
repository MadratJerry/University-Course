package pers.crazymousethief.bigsort.io;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

public class OrderedInputStream extends InputStream implements Iterable<String> {
    private Vector<BufferedReader> v;
    private Queue<BufferedReaderString> q;
    private Iterator<String> i;
    private String current = null;
    private int pos = 0;

    private String filter(String str) {
        var sb = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            var c = str.charAt(i);
            if (c >= '0' && c <= '9') sb.append(c);

        }
        return sb.toString();
    }


    public OrderedInputStream(Vector<InputStream> v) throws IOException {
        this.v = new Vector<>();
        for (InputStream stream : v)
            this.v.add(new BufferedReader(new InputStreamReader(stream)));
        q = new PriorityQueue<>(v.size(), Comparator.comparingInt(o -> Integer.parseInt(filter(o.getString()))));
        for (BufferedReader reader : this.v)
            q.add(new BufferedReaderString(reader.readLine(), reader));
        i = iterator();
    }

    @Override
    public int read() {
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
                    if (number == null || number.equals("")) v.remove(source);
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
            return brs.getString() == null ? null : brs.getString() + "\n";
        }
    }
}


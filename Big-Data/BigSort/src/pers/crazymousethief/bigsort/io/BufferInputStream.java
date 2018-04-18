package pers.crazymousethief.bigsort.io;

import java.io.IOException;
import java.io.InputStream;

public class BufferInputStream extends InputStream {
    private Object readLock = new Object();
    private Object writeLock = new Object();
    private boolean wasWrite = false;
    private boolean wasRead = false;
    private String buf = "";
    private int pos = 0;

    @Override
    public synchronized int read() throws IOException {
        if (buf == null) return -1;
        if (pos == buf.length()) {
            synchronized (writeLock) {
                wasWrite = true;
                writeLock.notify();
            }
            synchronized (readLock) {
                try {
                    while (!wasRead) {
                        readLock.wait();
                    }
                    wasRead = false;
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            pos = 0;
        }
        if (buf == null) return -1;
        return buf.charAt(pos++);
    }

    public void write(String buf) {
        synchronized (writeLock) {
            try {
                while (!wasWrite) {
                    writeLock.wait();
                }
                wasWrite = false;
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        synchronized (readLock) {
            this.buf = buf;
            wasRead = true;
            readLock.notify();
        }
    }

    public void flush() {
        write(null);
    }
}


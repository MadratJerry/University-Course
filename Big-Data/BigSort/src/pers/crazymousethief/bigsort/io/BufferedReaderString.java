package pers.crazymousethief.bigsort.io;

import java.io.BufferedReader;

class BufferedReaderString {
    private String string = null;
    private BufferedReader source = null;

    BufferedReaderString(String number, BufferedReader source) {
        this.string = number;
        this.source = source;
    }

    String getString() {
        return string + "\n";
    }

    BufferedReader getSource() {
        return source;
    }
}

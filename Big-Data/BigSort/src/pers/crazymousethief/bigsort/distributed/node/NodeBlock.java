package pers.crazymousethief.bigsort.distributed.node;

import java.io.Serializable;

public class NodeBlock implements Serializable {
    private SocketState socketSocketState = SocketState.FREE;
    private boolean isSorted = false;

    public SocketState getSocketSocketState() {
        return socketSocketState;
    }

    public void setSocketState(SocketState state) {
        this.socketSocketState = state;
    }

    public enum SocketState {
        FREE,
        RECEIVING,
        SENDING,
    }

    public boolean isSort() {
        return isSorted;
    }
}

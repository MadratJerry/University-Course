package pers.crazymousethief.bigsort.distributed.node;

import java.io.Serializable;

enum State {
    FREE
}

public class NodeBlock implements Serializable {
    private State state = State.FREE;

    public State getState() {
        return state;
    }
}

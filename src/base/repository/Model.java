package base.repository;

import java.lang.reflect.Field;
import java.util.List;

public abstract class Model {
    private List<Field> primaryKeyList;

    public Model() {
        primaryKeyList = Repository.getPrimaryKeyList(getSubClass());
    }

    public <T extends Model> T findOneByPK(Object... keys) {
        return Repository.findOneByPK(getSubClass(), primaryKeyList, keys);
    }

    private <T extends Model> Class<T> getSubClass() {
        @SuppressWarnings("unchecked")
        Class<T> tClass = (Class<T>) this.getClass();
        return tClass;
    }
}

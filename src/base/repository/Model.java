package base.repository;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

public abstract class Model {

    public <T extends Model> T findOneByPK() {
        List<Field> primaryKeyList = Repository.getPrimaryKeyList(getSubClass());
        return Repository.findOneByPK(getSubClass(), primaryKeyList.stream().map((f) ->
                {
                    try {
                        return new PropertyDescriptor(f.getName(), getSubClass()).getReadMethod().invoke(this);
                    } catch (IntrospectionException | IllegalAccessException | InvocationTargetException e) {
                        e.printStackTrace();
                    }
                    return null;
                }
        ).toArray());
    }

    private <T extends Model> Class<T> getSubClass() {
        @SuppressWarnings("unchecked")
        Class<T> tClass = (Class<T>) this.getClass();
        return tClass;
    }
}

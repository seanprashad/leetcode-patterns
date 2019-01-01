import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

public class HashMapList<T, E> {
	private HashMap<T, ArrayList<E>> map = new HashMap<T, ArrayList<E>>();

	/* Insert item into list at key. */
	public void put(T key, E item) {
		if (!map.containsKey(key)) {
			map.put(key, new ArrayList<E>());
		}
		map.get(key).add(item);
	}

	/* Insert list of items at key. */
	public void put(T key, ArrayList<E> items) {
		map.put(key, items);
	}

	/* Get list of items at key. */
	public ArrayList<E> get(T key) {
		return map.get(key);
	}

	/* Check if hashmaplist contains key. */
	public boolean containsKey(T key) {
		return map.containsKey(key);
	}

	/* Check if list at key contains value. */
	public boolean containsKeyValue(T key, E value) {
		ArrayList<E> list = get(key);
		if (list == null)
			return false;
		return list.contains(value);
	}

	/* Get the list of keys. */
	public Set<T> keySet() {
		return map.keySet();
	}

	@Override
	public String toString() {
		return map.toString();
	}
}

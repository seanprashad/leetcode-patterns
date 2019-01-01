import java.util.*;
import java.awt.*;

public class AssortedMethods {
	public static int randomInt(int n) {
		return (int) (Math.random() * n);
	}

	public static int randomIntInRange(int min, int max) {
		return randomInt(max + 1 - min) + min;
	}

	public static boolean randomBoolean() {
		return randomIntInRange(0, 1) == 0;
	}

	public static boolean randomBoolean(int percentTrue) {
		return randomIntInRange(1, 100) <= percentTrue;
	}

	public static boolean[][] randomBooleanMatrix(int M, int N, int percentTrue) {
		boolean[][] matrix = new boolean[M][N];
		for (int i = 0; i < M; i++) {
			for (int j = 0; j < N; j++) {
				matrix[i][j] = randomBoolean(percentTrue);
			}
		}
		return matrix;
	}

	public static int[][] randomMatrix(int M, int N, int min, int max) {
		int[][] matrix = new int[M][N];
		for (int i = 0; i < M; i++) {
			for (int j = 0; j < N; j++) {
				matrix[i][j] = randomIntInRange(min, max);
			}
		}
		return matrix;
	}

	public static int[] randomArray(int N, int min, int max) {
		int[] array = new int[N];
		for (int j = 0; j < N; j++) {
			array[j] = randomIntInRange(min, max);
		}
		return array;
	}

	public static LinkedListNode randomLinkedList(int N, int min, int max) {
		LinkedListNode root = new LinkedListNode(randomIntInRange(min, max), null, null);
		LinkedListNode prev = root;
		for (int i = 1; i < N; i++) {
			int data = randomIntInRange(min, max);
			LinkedListNode next = new LinkedListNode(data, null, null);
			prev.setNext(next);
			prev = next;
		}
		return root;
	}

	public static LinkedListNode linkedListWithValue(int N, int value) {
		LinkedListNode root = new LinkedListNode(value, null, null);
		LinkedListNode prev = root;
		for (int i = 1; i < N; i++) {
			LinkedListNode next = new LinkedListNode(value, null, null);
			prev.setNext(next);
			prev = next;
		}
		return root;
	}

	public static LinkedListNode createLinkedListFromArray(int[] vals) {
		LinkedListNode head = new LinkedListNode(vals[0], null, null);
		LinkedListNode current = head;
		for (int i = 1; i < vals.length; i++) {
			current = new LinkedListNode(vals[i], null, current);
		}
		return head;
	}

	public static String arrayToString(int[] array) {
		if (array == null)
			return "";
		return arrayToString(array, 0, array.length - 1);
	}

	public static String arrayToString(int[] array, int start, int end) {
		StringBuilder sb = new StringBuilder();
		for (int i = start; i <= end; i++) {
			int v = array[i];
			sb.append(v + ", ");
		}
		return sb.toString();
	}

	public static String stringArrayToString(String[] array) {
		StringBuilder sb = new StringBuilder();
		for (String v : array) {
			sb.append(v + ", ");
		}
		return sb.toString();
	}

	public static String toFullBinaryString(int a) {
		String s = "";
		for (int i = 0; i < 32; i++) {
			Integer lsb = new Integer(a & 1);
			s = lsb.toString() + s;
			a = a >> 1;
		}
		return s;
	}

	public static String toBaseNString(int a, int base) {

		String s = "";
		while (true) {
			int lastdigit = a % base;
			s = lastdigit + s;
			a = a / base;
			if (a == 0)
				break;
		}

		return s;
	}

	public static void printMatrix(int[][] matrix) {
		for (int i = 0; i < matrix.length; i++) {
			for (int j = 0; j < matrix[i].length; j++) {
				if (matrix[i][j] < 10 && matrix[i][j] > -10) {
					System.out.print(" ");
				}
				if (matrix[i][j] < 100 && matrix[i][j] > -100) {
					System.out.print(" ");
				}
				if (matrix[i][j] >= 0) {
					System.out.print(" ");
				}
				System.out.print(" " + matrix[i][j]);
			}
			System.out.println();
		}
	}

	public static void printMatrix(boolean[][] matrix) {
		for (int i = 0; i < matrix.length; i++) {
			for (int j = 0; j < matrix[i].length; j++) {
				if (matrix[i][j]) {
					System.out.print("1");
				} else {
					System.out.print("0");
				}
			}
			System.out.println();
		}
	}

	public static void printIntArray(int[] array) {
		for (int i = 0; i < array.length; i++) {
			System.out.print(array[i] + " ");
		}
		System.out.println("");
	}

	public static String charArrayToString(char[] array) {
		StringBuilder buffer = new StringBuilder(array.length);
		for (char c : array) {
			if (c == 0) {
				break;
			}
			buffer.append(c);
		}
		return buffer.toString();
	}

	public static String listOfPointsToString(ArrayList<Point> list) {
		StringBuilder buffer = new StringBuilder();
		for (Point p : list) {
			buffer.append("(" + p.x + "," + p.y + ")");
		}
		return buffer.toString();
	}

	public static TreeNode randomBST(int N, int min, int max) {
		int d = randomIntInRange(min, max);
		TreeNode root = new TreeNode(d);
		for (int i = 1; i < N; i++) {
			root.insertInOrder(randomIntInRange(min, max));
		}
		return root;
	}

	/* Creates tree by mapping the array left to right, top to bottom. */
	public static TreeNode createTreeFromArray(int[] array) {
		if (array.length > 0) {
			TreeNode root = new TreeNode(array[0]);
			java.util.Queue<TreeNode> queue = new java.util.LinkedList<TreeNode>();
			queue.add(root);
			boolean done = false;
			int i = 1;
			while (!done) {
				TreeNode r = (TreeNode) queue.element();
				if (r.left == null) {
					r.left = new TreeNode(array[i]);
					i++;
					queue.add(r.left);
				} else if (r.right == null) {
					r.right = new TreeNode(array[i]);
					i++;
					queue.add(r.right);
				} else {
					queue.remove();
				}
				if (i == array.length) {
					done = true;
				}
			}
			return root;
		} else {
			return null;
		}
	}

	public static String getLongTextBlob() {
		String book = "As they rounded a bend in the path that ran beside the river, Lara recognized the silhouette of a fig tree atop a nearby hill. The weather was hot and the days were long. The fig tree was in full leaf, but not yet bearing fruit. "
				+ "Soon Lara spotted other landmarks�an outcropping of limestone beside the path that had a silhouette like a man�s face, a marshy spot beside the river where the waterfowl were easily startled, a tall tree that looked like a man with his arms upraised. They were drawing near to the place where there was an island in the river. The island was a good spot to make camp. They would sleep on the island tonight."
				+ "Lara had been back and forth along the river path many times in her short life. Her people had not created the path�it had always been there, like the river�but their deerskin-shod feet and the wooden wheels of their handcarts kept the path well worn. Lara�s people were salt traders, and their livelihood took them on a continual journey. ";
		String book_mod = book.replace('.', ' ').replace(',', ' ').replace('-', ' ');
		return book_mod;
	}

	public static String[] getLongTextBlobAsStringList() {
		return getLongTextBlob().split(" ");
	}

	public static Trie getTrieDictionary() {
		return new Trie(getListOfWords());
	}

	public static HashSet<String> getWordListAsHashSet() {
		String[] wordList = getListOfWords();
		HashSet<String> wordSet = new HashSet<String>();
		for (String s : wordList) {
			wordSet.add(s);
		}
		return wordSet;
	}

	public static String getLongSampleText(boolean forceLower) {
		String text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi enim magna, rhoncus at risus at, tincidunt pretium sapien. Maecenas vitae sagittis urna. Donec egestas, mauris ut porttitor eleifend, lectus felis sollicitudin sapien, luctus tempor ligula lacus sit amet quam. Quisque gravida est dolor, vel cursus lacus cursus vel. Morbi vulputate ligula nec libero ullamcorper iaculis. Sed finibus tincidunt scelerisque. Cras condimentum lectus ac sem ornare, non pellentesque enim bibendum. Quisque tincidunt eget elit ut iaculis. Aliquam purus sapien, tincidunt non imperdiet eu, venenatis quis turpis. Vestibulum finibus porta urna sed consequat. Phasellus at rutrum enim. In euismod tellus nec ligula placerat dapibus. Quisque mauris urna, malesuada sit amet scelerisque at, euismod vitae nulla. Sed cursus lacus vitae leo venenatis, id ultrices ex fermentum.\r\n"
				+ "\r\n"
				+ "Duis non libero iaculis, euismod sapien non, lacinia odio. Nunc at est sodales, posuere nisl sit amet, bibendum tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc condimentum pretium congue. Sed viverra nibh ut tellus accumsan, non viverra sapien blandit. Integer convallis aliquam lacus, ut congue lectus feugiat sit amet. Nunc vel nisl sed nisi iaculis pharetra nec quis lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec laoreet in ex a facilisis. Aenean tincidunt dapibus augue, eu ultricies odio hendrerit ut. Nunc turpis sapien, blandit nec nibh quis, efficitur sodales dolor. Sed fringilla id quam eu vestibulum.\r\n"
				+ "\r\n"
				+ "Cras rutrum lorem rutrum tortor auctor cursus. Aenean tempor sed tellus eget vulputate. Nulla velit tellus, volutpat nec massa eget, fermentum euismod justo. Pellentesque scelerisque lobortis nulla ac vestibulum. Pellentesque ac scelerisque nibh. Duis tristique, nunc a posuere fermentum, felis sem egestas leo, id pellentesque ex augue in nibh. Nullam in eros lobortis, convallis nulla at, malesuada turpis. Aliquam consectetur efficitur orci bibendum tempus. Aenean ut lorem in arcu pellentesque accumsan a bibendum tortor. Maecenas neque nisi, mattis eget ex eget, porttitor ullamcorper erat. Maecenas varius ligula sed ullamcorper fermentum. In placerat ut dui nec placerat. Cras condimentum velit nec porttitor tincidunt. Cras et neque eu dolor condimentum imperdiet. Ut bibendum quam a erat varius hendrerit.\r\n"
				+ "\r\n"
				+ "In hac habitasse platea dictumst. Ut eleifend sem sit amet metus tincidunt euismod. Donec vel placerat mauris. Nulla facilisi. Nam vel purus et velit blandit ultricies. Aliquam non gravida erat. Ut non aliquam orci. Mauris ultrices condimentum dapibus.\r\n"
				+ "\r\n"
				+ "Cras ipsum sem, luctus eget suscipit sit amet, fermentum id elit. Morbi consectetur, tellus quis pretium interdum, erat nisi finibus massa, eget molestie ligula nisi egestas lorem. Praesent vitae consectetur erat, vitae lacinia dolor. Praesent placerat ut sapien eget bibendum. Phasellus malesuada lacus in metus bibendum, vel dapibus dolor imperdiet. Etiam ut nibh in risus iaculis commodo. Cras a elementum risus. Aenean luctus, dolor id accumsan egestas, dolor dui auctor augue, vitae commodo massa lacus at odio. In ut dignissim ex, sed tristique odio.\r\n"
				+ "\r\n"
				+ "Aenean ac malesuada lorem, eget placerat dui. Etiam at libero dictum, posuere neque non, interdum leo. Vivamus tempus sem id orci tempor, sit amet mattis augue aliquam. Aenean efficitur nunc sed lobortis egestas. Vivamus aliquet mi sit amet nisi convallis, sed volutpat neque fringilla. Duis blandit risus vitae felis pellentesque, quis facilisis ante suscipit. Proin vehicula metus commodo, aliquet nunc a, dignissim odio. In laoreet tortor ut nisl tempus fermentum. Maecenas auctor elementum leo, at tempor nisi feugiat et. Cras pulvinar arcu sit amet sem efficitur, vitae dictum eros lobortis. Pellentesque at orci consectetur, facilisis dui vel, lacinia dolor. Nullam rutrum porta dui, a sollicitudin neque aliquam vel. Sed sodales diam ac lorem feugiat, ut vulputate quam lacinia. Phasellus tincidunt dictum nibh et ultrices.\r\n"
				+ "\r\n"
				+ "Cras odio diam, euismod eu libero vitae, iaculis venenatis justo. Suspendisse pretium lectus nec suscipit mollis. Aenean eleifend ac turpis et tempor. Morbi turpis tortor, dictum sed condimentum id, commodo ut ligula. Aenean interdum nibh ante, nec cursus turpis facilisis nec. Aliquam scelerisque mollis mauris, quis rutrum nisl aliquet eget. Mauris condimentum tellus quis libero pretium feugiat. Nulla facilisi. Maecenas pharetra ultricies purus, nec fermentum quam eleifend non. Aliquam iaculis accumsan tellus quis pretium. Sed in ex sollicitudin, varius nibh in, scelerisque felis.\r\n"
				+ "\r\n"
				+ "Duis et lacus eu lorem scelerisque lacinia vitae eu odio. Ut mi dolor, vehicula eget libero ut, imperdiet sodales justo. Suspendisse pulvinar dignissim sagittis. Nam arcu velit, tempor non tortor id, sodales egestas nibh. Morbi dictum a felis quis pretium. Mauris dignissim ligula vel nunc blandit, in dapibus augue dignissim. Quisque non risus non augue aliquam semper at in tortor. Ut sed massa varius odio ultrices aliquet. In tempor augue ex, eu rutrum ex malesuada eu.\r\n"
				+ "\r\n"
				+ "Ut dignissim nisl ut purus placerat rutrum eu vel diam. Nulla aliquam lectus quis neque tempor iaculis. Quisque non ligula in nibh dapibus scelerisque. Duis aliquam venenatis odio sed congue. Aenean vel dui nulla. Curabitur at maximus metus. Integer non lectus vel lacus gravida eleifend. Aenean sed sapien molestie dui consectetur mollis nec non erat. Vestibulum facilisis in massa nec posuere. Nam nec elit vulputate, commodo urna non, mollis magna. Duis dolor lorem, tincidunt eget volutpat in, viverra ut nunc. Aenean lacinia ornare mi id accumsan.\r\n"
				+ "\r\n"
				+ "Donec non cursus nibh. Duis eu dolor sollicitudin nisi consectetur blandit vitae nec tortor. Praesent tempor condimentum magna at tincidunt. Nullam nisi lacus, maximus eget euismod ut, tristique sit amet augue. Mauris a dui justo. Pellentesque convallis ullamcorper lectus eget pellentesque. Integer scelerisque fermentum egestas. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque suscipit a mauris a rhoncus. Ut pulvinar, mi id porta pulvinar, urna tortor dapibus mauris, ut cursus tellus tellus in tortor. Curabitur at nunc placerat, vehicula libero quis, iaculis odio. Mauris id porttitor leo, et ultricies ex. Sed cursus egestas ante in tristique.\r\n"
				+ "\r\n"
				+ "Pellentesque nec lobortis elit, eu fermentum leo. Aliquam elementum at orci pulvinar laoreet. Aenean eu vulputate sapien, quis vestibulum nunc. Aliquam tincidunt mollis mi, ac consectetur felis tempor porta. Nulla facilisi. In porta elementum hendrerit. Nulla mattis quis eros quis lobortis. Quisque semper enim at finibus fringilla. Duis nunc orci, semper sit amet magna hendrerit, rhoncus posuere libero.\r\n"
				+ "\r\n"
				+ "Fusce facilisis sem massa, eget ultricies sem laoreet nec. Praesent non blandit felis. Nulla facilisi. Sed orci velit, tristique at pharetra cursus, euismod sit amet turpis. Nulla quis euismod elit, ut dapibus diam. Nam pulvinar convallis interdum. Phasellus nunc ante, porttitor quis dignissim vel, dictum a neque. Fusce quis augue quis ipsum pulvinar ultricies. Ut nec nunc vitae lectus vehicula elementum eu quis magna. Aliquam euismod iaculis lorem nec pretium. Integer eget sagittis mi. Interdum et malesuada fames ac ante ipsum primis in faucibus.\r\n"
				+ "\r\n"
				+ "Vestibulum at mattis ex. Cras eu ligula quis eros gravida aliquet. Pellentesque non lorem ac ante laoreet porttitor. Vestibulum eget consequat lacus. Ut at arcu velit. Aenean mattis aliquet urna a hendrerit. Nam condimentum finibus fermentum. Cras id est at ex tincidunt fringilla. Maecenas ultricies vel nisi eu semper. Vivamus a volutpat justo. Quisque cursus vulputate eros, eu dictum eros. Maecenas tempus magna semper egestas feugiat. Donec interdum sagittis mi, eu vulputate nisi. Ut accumsan rutrum faucibus.\r\n"
				+ "\r\n"
				+ "Mauris id ultricies mauris. Vivamus purus magna, dictum at posuere non, ullamcorper sagittis magna. Etiam dictum consequat justo, a euismod purus ornare quis. Suspendisse hendrerit pulvinar metus, id malesuada purus scelerisque et. Suspendisse dui quam, convallis nec libero non, hendrerit aliquet leo. Nam eget accumsan massa. Proin vel ante neque. Donec dapibus, est nec ullamcorper auctor, ligula lorem molestie augue, at luctus sapien lorem eget libero. Duis porttitor massa id purus sollicitudin, sed gravida massa porta. Mauris sollicitudin id sem ac maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin vulputate justo vel dignissim lacinia. Donec quam justo, venenatis id ex dignissim, malesuada posuere neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam lacus turpis, semper vel orci vitae, condimentum hendrerit ligula.\r\n"
				+ "\r\n"
				+ "Morbi ut dui risus. Sed eu est velit. Sed vel congue risus. Praesent pulvinar eu arcu tempor sagittis. Integer fringilla mollis pellentesque. Aliquam sed lobortis lacus. Quisque rhoncus maximus odio et mollis. Sed egestas, lectus ut fringilla mattis, velit massa ullamcorper metus, a feugiat metus nunc sit amet tellus. Praesent egestas, metus nec mollis laoreet, elit est pellentesque tellus, mollis dictum nunc mauris eu nisi. Sed laoreet tempus risus at ornare.\r\n"
				+ "\r\n"
				+ "Sed lorem tortor, egestas sit amet ligula ac, sollicitudin porttitor elit. Praesent consectetur id metus mollis suscipit. Phasellus non dictum mauris. In porta nisl sit amet tincidunt porta. Nullam sollicitudin, odio ac vehicula fermentum, arcu purus gravida lacus, at tempor felis odio sit amet lorem. Integer euismod eros sed gravida mattis. Vestibulum nec justo eros. Nunc fermentum molestie mauris sit amet imperdiet. Maecenas pulvinar sit amet ligula vitae aliquam. Aliquam hendrerit orci sed ex pellentesque porta.\r\n"
				+ "\r\n"
				+ "Mauris tempor quis nunc vel consequat. Donec a aliquet tortor, et mollis est. Nullam a cursus lectus. Quisque non laoreet magna, sit amet elementum justo. Vestibulum fringilla metus eu magna scelerisque venenatis. Proin fringilla massa in lobortis finibus. Suspendisse dignissim est at leo tincidunt mollis. Curabitur luctus velit fringilla nisi blandit semper.\r\n"
				+ "\r\n"
				+ "Suspendisse potenti. Duis at semper arcu. Mauris aliquam non augue a luctus. Praesent aliquet tristique turpis id imperdiet. Nullam at enim id tellus finibus faucibus eu auctor eros. Praesent lobortis cursus suscipit. Ut porta lacus at risus aliquet, non sagittis orci sollicitudin. Ut viverra sapien sed tincidunt sagittis. Fusce luctus diam vitae ante fermentum, non cursus est sollicitudin. Maecenas at tincidunt augue, scelerisque tincidunt arcu. Etiam interdum nisl at blandit laoreet. Phasellus in sapien id purus auctor fringilla. Donec erat nunc, finibus eu porta nec, vulputate sit amet neque. In hac habitasse platea dictumst.\r\n"
				+ "\r\n"
				+ "Duis ornare lectus luctus magna scelerisque, quis convallis erat feugiat. Ut at libero pellentesque, congue lectus at, tincidunt nunc. Curabitur elementum, metus eget tincidunt ultrices, ante orci feugiat velit, quis fermentum enim leo a diam. Quisque ultricies pulvinar orci, vitae pharetra nisi auctor a. Nullam eu condimentum neque, id congue purus. Ut eros sapien, sollicitudin quis risus tristique, ultrices pulvinar mauris. Nunc ullamcorper suscipit nulla, ac fringilla ipsum dignissim vitae. Cras porttitor sed ex eu finibus. Praesent tincidunt, libero in maximus bibendum, nibh turpis rhoncus neque, sed commodo tortor orci ac tellus. Sed eget lacinia dolor, non pellentesque magna. Suspendisse et ipsum vestibulum, suscipit urna sit amet, ullamcorper nisi. Ut ut ante sit amet velit varius hendrerit. Proin in massa sit amet ex posuere vestibulum. Ut egestas sodales magna ut mollis. Fusce vitae leo iaculis, posuere leo ut, pretium neque. Nullam tincidunt dui eu dui tristique, non venenatis libero maximus.\r\n"
				+ "\r\n"
				+ "Quisque sed auctor dolor. Nam sit amet cursus nisl. Nunc et pretium risus. Ut tempor massa nec dolor malesuada ultricies. Praesent hendrerit vestibulum tincidunt. Suspendisse et magna eget turpis hendrerit rhoncus ut at purus. Vestibulum non tellus mattis, lacinia justo id, iaculis lorem. Vestibulum tincidunt sapien nec lorem dapibus, egestas mollis turpis tempor. Nunc id imperdiet tortor, vel sodales ex. Duis ut libero nec nibh sollicitudin sollicitudin.\r\n"
				+ "\r\n"
				+ "Integer viverra quam at metus elementum, in ornare ex gravida. Suspendisse sed velit cursus, pellentesque mauris in, gravida ligula. Maecenas et nibh auctor, molestie urna in, euismod mi. Integer lobortis lacinia enim eu egestas. Praesent nisl enim, consectetur eu libero eget, convallis semper ex. Maecenas commodo velit nec erat ultricies, et dapibus neque dignissim. Nullam dictum velit et ipsum egestas volutpat. Ut feugiat diam id eros convallis sagittis. Aenean viverra justo eu enim malesuada, ut interdum neque sollicitudin. Aliquam erat volutpat. Sed aliquam leo nunc, id laoreet sapien posuere at. Nunc imperdiet lacus ac efficitur hendrerit.\r\n"
				+ "\r\n"
				+ "Vivamus dignissim erat eu erat aliquam luctus. Sed varius lacinia mauris, placerat facilisis massa finibus quis. Proin ac turpis a neque vulputate maximus vel non libero. Nunc ornare tempor tortor, vitae dignissim augue ullamcorper et. Cras at auctor risus, at interdum tortor. Proin finibus convallis ex, et pulvinar augue tincidunt sed. Suspendisse laoreet velit non mi viverra rhoncus. Fusce tristique pulvinar mauris, et tempor dolor. In gravida felis metus, eu venenatis ante aliquet non. Sed condimentum orci at urna aliquam, vitae ornare quam pellentesque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;\r\n"
				+ "\r\n"
				+ "Quisque lacinia, lacus sit amet cursus semper, risus felis convallis ipsum, vitae condimentum tellus nunc non dui. Sed semper, magna at laoreet convallis, diam erat imperdiet leo, sit amet fringilla felis purus eget justo. Sed accumsan odio eget sem tristique mattis. In hac habitasse platea dictumst. Etiam aliquet ultricies augue, ac consequat risus semper volutpat. Praesent sollicitudin dolor enim, quis egestas ex vestibulum quis. Quisque vehicula, lectus eget dapibus sodales, orci massa facilisis justo, vel semper ante nunc nec augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam a lorem dignissim, accumsan erat sit amet, ornare purus. Curabitur sit amet tempus odio, id laoreet libero. Quisque augue nisi, sodales ac finibus vitae, pharetra vel turpis. Ut interdum sodales feugiat. Maecenas facilisis, eros eu blandit volutpat, est risus lobortis tortor, in interdum elit odio eget nunc. Fusce et aliquet tortor, quis consectetur tortor. Nullam ut urna non massa bibendum semper.\r\n"
				+ "\r\n"
				+ "Vivamus dui tortor, mattis eu iaculis viverra, rutrum sit amet quam. Sed non mollis dui, quis pretium dolor. In consequat nisl nec orci ultrices condimentum sit amet nec arcu. In cursus velit a congue fringilla. Curabitur hendrerit faucibus faucibus. Phasellus aliquet ut risus at rhoncus. Praesent tellus orci, scelerisque vel elit varius, lobortis porttitor erat.\r\n"
				+ "\r\n"
				+ "Sed ac neque vehicula, interdum ligula ac, pharetra mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed ipsum erat, lobortis sed mollis sit amet, porttitor elementum dui. Nunc in massa ut mauris rutrum sollicitudin. Pellentesque nec sem auctor mauris fermentum faucibus id at odio. Nullam ut libero at tortor egestas commodo. Aenean vitae est nec leo fermentum iaculis ut ut dui. Nulla elementum non dolor vitae cursus.\r\n"
				+ "\r\n"
				+ "Nulla lorem neque, sodales vel erat non, pretium gravida nibh. Vivamus vestibulum tempor rutrum. Maecenas risus dolor, congue in ullamcorper eu, consequat id magna. Cras pretium gravida purus eu aliquet. Sed pellentesque lorem ac metus posuere dapibus. Sed at ligula at dui porta semper at vitae sem. Sed elementum nunc eget blandit hendrerit. Curabitur sit amet dui nulla. Nam leo orci, consequat sit amet urna quis, faucibus sagittis ligula. Pellentesque nec tincidunt ante, a ornare mauris. Phasellus vehicula feugiat nisl, et fermentum velit tempus eget.\r\n"
				+ "\r\n"
				+ "Cras vel nunc vitae leo viverra laoreet eget non dolor. Duis eleifend, metus tincidunt auctor ultricies, leo tellus condimentum velit, eget vulputate dolor mauris a felis. Nunc hendrerit, velit id molestie pharetra, nulla diam mollis erat, quis cursus erat orci eget lacus. Donec in massa vehicula, aliquet sapien et, congue libero. In quis ex faucibus est pharetra suscipit. Nunc quis dictum leo. Donec urna leo, pretium tempus vulputate a, iaculis sit amet odio. Aenean dictum consequat elit, in gravida erat aliquam sit amet. Praesent nec urna mi. Fusce quis malesuada lacus, id mollis ex. Nullam felis eros, vestibulum id luctus a, eleifend in lacus. Nullam iaculis tempus tortor, quis porttitor magna scelerisque sit amet.\r\n"
				+ "\r\n"
				+ "Nunc et nisi ac ligula vulputate pharetra eu sit amet tellus. Integer eleifend, nulla sit amet auctor posuere, libero tellus finibus magna, quis maximus sapien ipsum vel nibh. Vestibulum dictum risus et justo efficitur tempus. Ut eu hendrerit libero, nec rhoncus sapien. Integer et est magna. Quisque ullamcorper lacinia ex, et elementum turpis molestie sit amet. Integer placerat pharetra aliquet. Praesent id sodales erat. Donec iaculis, nibh et dapibus rhoncus, sem enim dignissim leo, eget porttitor neque diam eu sem. Duis consequat dignissim libero at aliquet. Maecenas pharetra nisi sit amet mollis interdum. Aenean vestibulum orci lacinia, porta lorem in, pharetra nibh. Duis sem elit, rutrum id nunc ac, lobortis aliquet mauris. Nullam ornare tortor ac erat venenatis, vitae tincidunt nunc posuere.\r\n"
				+ "\r\n"
				+ "Aenean id arcu tellus. Cras justo odio, tempor a lacus ultricies, hendrerit condimentum urna. Curabitur lobortis blandit nulla eget aliquam. Pellentesque placerat efficitur molestie. Nullam ac libero maximus, volutpat magna condimentum, consequat nisi. Donec sagittis est nec tincidunt convallis. Nullam blandit neque augue. Suspendisse diam lacus, mollis quis condimentum nec, varius ut mi. Donec aliquam quam non nulla commodo, ac ultricies nisl gravida. Nullam ante purus, aliquam id urna vitae, interdum ultricies dolor. Nulla ipsum nulla, egestas facilisis nisl vel, rutrum feugiat erat.\r\n"
				+ "\r\n"
				+ "Fusce ornare dapibus commodo. In gravida, nibh gravida cursus pretium, lorem massa blandit diam, quis vestibulum dolor dui at felis. Maecenas eget ornare ex. Nunc blandit laoreet gravida. Nulla efficitur euismod nisl non interdum. Vestibulum eleifend porta venenatis. Suspendisse mattis consequat ligula, tincidunt mollis nisl. In molestie, mauris a bibendum tempus, justo nisl congue libero, id euismod leo odio et odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent in volutpat tellus, sagittis ullamcorper tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras tincidunt ultricies dolor hendrerit iaculis. Vestibulum sodales dignissim felis porttitor ultrices. Ut condimentum nunc id nisi egestas, non finibus dui accumsan.\r\n"
				+ "\r\n"
				+ "Sed eget nibh vitae lorem condimentum rhoncus. Vivamus tincidunt molestie nisl non viverra. Nulla facilisi. Cras eu dolor erat. Suspendisse fringilla in risus sed rhoncus. Quisque eu dolor libero. Integer dictum est quis felis luctus sagittis. Ut auctor nibh iaculis nibh consequat tempor. Proin ex tortor, dapibus gravida mauris et, pretium elementum risus. Vivamus venenatis tempus diam quis varius. Fusce at ultricies mauris. Cras consequat est mattis dolor ultrices, ac mattis nibh porttitor. Donec fringilla, velit eget viverra dignissim, augue tortor tempus velit, in fringilla dolor dolor a nibh. Duis quis gravida sapien. Etiam aliquam semper ante sed consequat. Sed urna sem, semper sodales urna et, sollicitudin luctus nunc.\r\n"
				+ "\r\n"
				+ "Nam nisl arcu, pharetra ac tincidunt non, bibendum nec magna. Cras lobortis felis non lectus maximus, id dapibus nisi pellentesque. Maecenas id velit eros. Donec volutpat orci sed risus malesuada vestibulum. Nunc metus arcu, auctor eu nisl eget, varius ornare erat. Sed mollis ante non lectus gravida iaculis. Proin nunc lectus, convallis nec interdum vitae, sodales eu dui. Ut ipsum tortor, efficitur a leo in, imperdiet maximus felis. Ut iaculis libero id arcu dapibus, vel ullamcorper mi consequat. In varius elementum est at pretium. Aenean accumsan dapibus risus, vel sollicitudin justo facilisis a.\r\n"
				+ "\r\n"
				+ "Sed ultrices, erat in varius tempor, felis sem vulputate dui, vel accumsan enim lorem eget purus. Duis feugiat fringilla elit, non ultricies massa lobortis non. Proin nec molestie massa, id tincidunt elit. Aliquam purus orci, condimentum nec ante lacinia, vulputate semper nisl. Maecenas vitae nibh pulvinar est gravida pulvinar. Praesent tincidunt tellus sed ex pretium, et aliquam odio egestas. Nunc eget iaculis velit. Aenean est erat, eleifend ut eros ac, bibendum pellentesque felis. Nulla convallis, arcu sit amet bibendum egestas, massa augue tincidunt lacus, ac posuere magna justo sit amet magna. Donec id ante ex.\r\n"
				+ "\r\n"
				+ "Fusce sit amet feugiat risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fringilla est sit amet iaculis gravida. Morbi urna magna, hendrerit sollicitudin ex sit amet, aliquam volutpat dolor. Vivamus fermentum quis augue ut luctus. In eu nibh mi. Mauris ipsum metus, auctor quis mattis convallis, commodo id arcu. Aenean semper id lorem pulvinar auctor. Cras fringilla egestas lectus, nec fermentum neque eleifend non. Nunc scelerisque est posuere laoreet imperdiet. Morbi in dignissim mauris, sed sagittis libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas dapibus tincidunt blandit.\r\n"
				+ "\r\n"
				+ "Vivamus ac risus magna. Etiam venenatis ac ligula at mollis. Morbi elit nulla, molestie sit amet nunc id, fermentum imperdiet leo. Morbi vitae gravida felis, dapibus aliquet neque. Ut eu urna cursus eros placerat porta. Donec vitae faucibus quam. Proin ac dolor sit amet turpis pellentesque tristique. Pellentesque quis iaculis nisl. Morbi gravida imperdiet orci, eget ultricies diam egestas ac. Mauris elit ante, pharetra quis ligula ut, condimentum imperdiet tortor. Donec egestas libero eu mauris pellentesque lobortis.\r\n"
				+ "\r\n"
				+ "Mauris sollicitudin leo a lectus mattis, in convallis dolor dapibus. Nam dapibus vitae velit ac tincidunt. Etiam facilisis, urna eu dictum mollis, nisl libero fermentum lectus, nec lacinia quam massa a arcu. Etiam mollis sodales ante, in vulputate nibh blandit eget. Maecenas sit amet felis libero. Sed congue sed eros nec lacinia. Praesent magna ipsum, vehicula quis magna et, condimentum elementum arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Mauris rhoncus tortor id imperdiet tincidunt.\r\n"
				+ "\r\n"
				+ "Donec mollis quis metus nec scelerisque. Integer nec leo eu massa semper mattis vel eu nisi. Nullam tellus urna, lacinia quis interdum quis, accumsan consectetur odio. Curabitur mauris mauris, consequat et porta ac, elementum at massa. Maecenas bibendum, quam ac posuere tincidunt, turpis arcu convallis neque, sit amet condimentum orci ex ut purus. Duis sit amet malesuada leo. Fusce nulla nibh, condimentum quis enim ut, lacinia mattis erat. Quisque varius nulla tempus, feugiat lorem et, mattis nisi. In at eleifend nibh, at commodo ipsum. Proin et massa sollicitudin, volutpat justo non, lacinia est. Etiam imperdiet libero nec dolor ornare condimentum. Sed ante neque, pharetra at suscipit a, efficitur non lacus.\r\n"
				+ "\r\n"
				+ "Sed elementum ut ex ac scelerisque. Proin metus erat, laoreet ut orci et, consectetur tincidunt elit. Pellentesque placerat egestas metus, a fringilla erat tristique sed. Donec sagittis, ipsum ac mattis auctor, tortor nunc imperdiet nibh, eu pretium lacus lacus sed dui. Quisque elementum elit arcu, sed aliquet sapien consequat at. Suspendisse accumsan ultricies dolor, sit amet finibus dolor luctus quis. Pellentesque sed porttitor diam, vitae ultrices metus. Vivamus ornare malesuada nibh. Donec vehicula facilisis dui, eu accumsan velit porttitor in. Phasellus sagittis, augue nec maximus cursus, lorem orci hendrerit nibh, eget ullamcorper velit sem non justo. Vestibulum sed nunc nisl. Donec et nunc fermentum, molestie est in, tristique eros. Vivamus tincidunt auctor odio, at lobortis ante bibendum sit amet. Sed in justo consectetur nisi viverra rhoncus quis posuere elit.\r\n"
				+ "\r\n"
				+ "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam a tristique odio. Pellentesque sed mattis ex. Pellentesque dignissim varius lectus. Proin hendrerit lacus diam, ac porttitor libero dapibus sed. Maecenas sit amet leo posuere orci auctor pretium. Nam gravida, arcu eget convallis porttitor, felis leo ultrices est, sed pulvinar lorem nisi et sapien. Nulla eu enim a mauris pretium lacinia. Curabitur lacinia urna enim, a tempor nunc venenatis non. Integer at sem id odio luctus mollis hendrerit id enim.\r\n"
				+ "\r\n"
				+ "Nunc sagittis, dolor vel lacinia mattis, erat erat vehicula diam, at commodo quam neque a felis. Sed efficitur, felis a rutrum imperdiet, ex nisi elementum orci, a tempus turpis nibh eget velit. Cras dictum dictum odio condimentum bibendum. Sed finibus, justo eget tempus blandit, ligula est sodales purus, eget convallis risus mauris et neque. Nunc vulputate, felis in posuere congue, diam orci sollicitudin orci, ut blandit arcu tortor quis sem. Maecenas posuere fermentum ullamcorper. In congue elit eget orci ultrices, in consequat libero venenatis. Morbi luctus feugiat malesuada. Nunc ut mi sed mauris imperdiet porttitor quis quis urna. Pellentesque fermentum augue commodo eleifend rhoncus. Aliquam a erat facilisis mi interdum cursus. Duis ligula magna, pharetra vitae accumsan sed, accumsan eget ligula.\r\n"
				+ "\r\n"
				+ "Nullam enim dolor, facilisis dapibus pretium sit amet, posuere non nunc. Aenean volutpat, erat consectetur semper accumsan, augue nisi feugiat sem, ut consequat elit nisl sit amet lacus. Donec sodales libero eu dui tincidunt, vitae pulvinar magna faucibus. Etiam euismod nisl justo. Donec lorem massa, vulputate sit amet velit id, molestie sagittis massa. Nullam vel efficitur ante. Nullam dignissim ligula nisl, non posuere elit accumsan vitae. Pellentesque placerat lacinia maximus. Aenean in suscipit massa. Suspendisse egestas leo diam, a aliquet eros condimentum vitae.\r\n"
				+ "\r\n"
				+ "Aenean sed nunc lobortis nulla sollicitudin commodo. Duis dictum, turpis id fermentum vestibulum, risus urna semper erat, egestas auctor leo est vitae mi. Etiam lectus felis, venenatis ac posuere a, hendrerit non velit. Proin id mattis neque, et eleifend magna. Praesent congue eros a pretium blandit. Vestibulum vulputate lectus id erat scelerisque, at sollicitudin metus volutpat. Curabitur hendrerit eu nisi eget rutrum. Nulla facilisi. Mauris varius enim neque, a luctus mauris dapibus nec. Nunc porttitor, nisi eget ultricies ornare, nunc dolor blandit felis, vestibulum iaculis sapien nisi et diam. Donec vehicula dui sit amet placerat aliquet. Aenean finibus ex urna, in consequat massa fringilla et. Aliquam at ullamcorper eros. Vivamus sem lorem, iaculis ac imperdiet eget, mollis vel neque.\r\n"
				+ "\r\n"
				+ "Donec justo nisl, lobortis sit amet elit at, consequat accumsan leo. Phasellus at justo urna. Phasellus molestie felis vitae volutpat dignissim. Nam vel leo eu diam ultricies tincidunt. Vestibulum venenatis urna a libero accumsan, eu posuere enim finibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In pretium pulvinar convallis.\r\n"
				+ "\r\n"
				+ "Donec ultrices in felis et tincidunt. Suspendisse volutpat blandit erat, non malesuada eros mattis in. In elementum turpis at mi porttitor accumsan. Pellentesque viverra, orci et viverra sollicitudin, nulla turpis maximus diam, id pulvinar odio augue eu ipsum. In porttitor leo sit amet velit rhoncus molestie. Nam in tempus nisl. Phasellus hendrerit consequat sem. Nulla sollicitudin velit eu nunc congue, id tincidunt diam congue. Nulla lacinia malesuada blandit. Curabitur vehicula erat at urna eleifend commodo. Ut ultricies fringilla sapien, in tincidunt magna. Nunc vel enim eget arcu imperdiet cursus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\r\n"
				+ "\r\n"
				+ "Aenean rutrum orci a tempor pulvinar. Aliquam ut nibh sed quam hendrerit ultrices. Proin sodales ac leo in tempor. Nulla id condimentum urna. Vivamus vitae metus nec risus mollis porttitor. Donec quis euismod neque, gravida malesuada tellus. Nunc sem lacus, fringilla at lectus nec, semper tempus ipsum.\r\n"
				+ "\r\n"
				+ "Sed iaculis sit amet neque id molestie. Suspendisse ipsum enim, eleifend ut imperdiet sollicitudin, auctor vitae eros. Praesent venenatis nisi velit, id maximus risus congue blandit. Cras cursus eget augue vel sollicitudin. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam congue, ligula nec semper pretium, diam urna sagittis turpis, at venenatis mauris ipsum quis velit. Suspendisse elementum cursus pellentesque. Proin accumsan mauris arcu, a pretium lectus lobortis id. Nullam congue tellus in ullamcorper varius. Quisque non mi quis est pharetra tincidunt eget congue enim. Nulla tempus ac neque ac suscipit. Sed porta, dui vel euismod sagittis, velit nibh malesuada ipsum, in consequat est nibh eget arcu. Nam imperdiet sagittis justo et fermentum. Etiam lobortis nibh interdum orci bibendum, a interdum risus fermentum. Proin in ante tincidunt neque molestie sodales at non diam.\r\n"
				+ "\r\n"
				+ "Nulla est dui, eleifend non aliquam sed, posuere ut ex. Aliquam dolor justo, blandit at arcu id, dignissim vestibulum sapien. Phasellus tristique ipsum vel risus facilisis cursus. Suspendisse hendrerit dignissim est ac pulvinar. Mauris tempor auctor orci, vitae commodo arcu laoreet sit amet. Aliquam hendrerit turpis a risus pharetra consectetur. Sed convallis quis nunc vel laoreet. Morbi sollicitudin pharetra dui sed porttitor. Praesent quis elementum quam, vitae rutrum mi.\r\n"
				+ "\r\n"
				+ "In tempus sollicitudin ultrices. Vivamus hendrerit ligula id maximus dapibus. Integer a aliquet nunc, sed accumsan diam. Curabitur faucibus varius enim, non elementum felis venenatis nec. Etiam purus tortor, rutrum at arcu ac, ornare vulputate dui. In consectetur luctus volutpat. Nulla sed eros pharetra, porta elit eu, pellentesque erat. Maecenas faucibus cursus malesuada. Praesent blandit mauris ullamcorper massa congue, sagittis sodales neque varius. Vivamus viverra sodales tortor non gravida. Proin in nibh nec orci maximus porta quis sed arcu. Morbi a dapibus ipsum, quis ornare lectus. Donec ut ante turpis. Sed felis justo, molestie vel felis ac, auctor blandit lacus. In at auctor mauris. Aenean consectetur vulputate blandit.\r\n"
				+ "\r\n"
				+ "Maecenas luctus, enim vel suscipit convallis, lorem libero volutpat eros, ut laoreet augue mauris non diam. Curabitur ut ornare leo. Vivamus nec augue sed velit sagittis hendrerit sed nec tortor. Nullam volutpat velit id feugiat convallis. Mauris non mi id nibh ornare sagittis. Fusce luctus quis ex vestibulum consectetur. Proin fermentum neque et varius ornare. Vivamus quis nibh quam. Nullam et neque eget augue euismod pretium consectetur sit amet mi. Curabitur fringilla nibh vitae massa aliquam, ut finibus lorem facilisis. Nullam sodales tristique magna convallis viverra. Morbi interdum, nisi vel posuere congue, orci purus hendrerit turpis, non pellentesque tellus libero eget sem.\r\n"
				+ "\r\n"
				+ "Nulla nec euismod quam, in mattis enim. In dapibus non eros eu dapibus. Nam lorem leo, luctus id cursus et, euismod et eros. Quisque eget interdum nisl. Vestibulum sed nibh non quam iaculis scelerisque. Quisque ut fermentum mauris, sit amet scelerisque mauris. Vestibulum vel eros at enim rhoncus porttitor. Duis vel mauris scelerisque, interdum quam vel, mollis leo. Praesent sit amet tortor facilisis, dictum leo sit amet, ullamcorper ex. Donec ultrices scelerisque nunc accumsan vehicula. Curabitur ultricies mollis turpis, eget ornare massa congue in. Donec nisl neque, pellentesque rhoncus nunc rutrum, porta commodo elit. Suspendisse potenti. Cras non est quis ligula molestie sodales in eget ex.\r\n"
				+ "\r\n"
				+ "Nulla sed tincidunt felis. Phasellus gravida odio in eros aliquet tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae aliquam sapien. Vivamus tincidunt rhoncus pretium. Integer pellentesque feugiat sapien nec tristique. Suspendisse libero dui, consectetur eu nibh sed, sodales interdum nulla. Nunc in risus porta nunc lacinia laoreet at ut odio. Duis velit metus, pharetra in quam lobortis, porta accumsan turpis. Donec in sapien egestas, cursus diam sit amet, eleifend nisl. Integer at augue id nunc sagittis vulputate cursus ac mauris.\r\n"
				+ "\r\n"
				+ "Vestibulum est est, sodales non ultrices non, venenatis eu felis. Nulla felis urna, consectetur a purus ut, fermentum tempus magna. Phasellus ut dui tincidunt neque interdum congue ut at ante. Nulla blandit eros id libero vestibulum consequat. Maecenas gravida tincidunt felis ut auctor. In vehicula, ligula eu eleifend pulvinar, neque ex interdum quam, id cursus neque turpis non lorem. Nunc id libero dapibus, iaculis mi et, tempor massa. Vestibulum id gravida dui. Nulla vitae ipsum at lectus commodo blandit ac sed neque.\r\n"
				+ "\r\n"
				+ "Morbi magna purus, volutpat sed pulvinar non, bibendum quis est. Cras semper nulla augue, quis elementum orci congue malesuada. Nulla et rutrum arcu. Pellentesque dignissim pharetra lacus. Etiam eu quam tincidunt, commodo tortor non, dictum mauris. Fusce aliquam maximus ante a pretium. Nulla ut lacus orci. Morbi sollicitudin auctor placerat. Integer at porttitor orci. Ut volutpat orci ante, nec venenatis quam mollis sit amet.\r\n"
				+ "\r\n"
				+ "Donec volutpat, leo auctor congue iaculis, tellus urna feugiat lorem, id laoreet velit sem porttitor diam. Quisque interdum volutpat metus ac pellentesque. Etiam nec nunc sed urna vestibulum posuere ut vitae metus. Duis ac tortor scelerisque, fermentum erat a, blandit purus. Donec ac nunc ipsum. Duis.";
		return forceLower ? text.toLowerCase() : text;
	}

	public static String[] getListOfWords() {
		// Words in the dictionary.
		String[] wordList = { "the", "of", "and", "a", "to", "in", "is", "be", "that", "was", "world", "awesome", "he",
				"for", "it", "with", "as", "his", "I", "on", "have", "at", "by", "not", "surely", "they", "this",
				"attract", "computer", "had", "are", "but", "from", "or", "she", "an", "which", "you", "one", "we",
				"all", "were", "her", "would", "there", "their", "will", "when", "who", "him", "been", "has", "more",
				"if", "no", "out", "do", "so", "can", "what", "up", "said", "about", "other", "into", "than", "its",
				"time", "only", "could", "new", "them", "man", "some", "these", "then", "two", "first", "May", "any",
				"like", "now", "my", "such", "make", "over", "our", "even", "most", "me", "state", "after", "also",
				"made", "many", "did", "must", "before", "back", "see", "through", "way", "where", "get", "much", "go",
				"well", "your", "know", "should", "down", "work", "year", "because", "come", "people", "just", "say",
				"each", "those", "take", "day", "good", "how", "long", "Mr", "own", "too", "little", "use", "us",
				"very", "great", "still", "men", "here", "life", "both", "between", "old", "under", "last", "never",
				"place", "same", "another", "think", "abuse", "house", "while", "high", "right", "might", "came", "off",
				"find", "states", "since", "used", "give", "against", "three", "himself", "look", "few", "general",
				"heart", "hand", "school", "resin", "part", "small", "American", "home", "during", "number", "again",
				"Mrs", "around", "thought", "went", "without", "however", "govern", "don't", "does", "got", "public",
				"United", "point", "end", "become", "head", "once", "course", "fact", "upon", "need", "system", "set",
				"every", "trend", "war", "put", "form", "water", "took", "program", "present", "government", "thing",
				"told", "possible", "group", "large", "until", "always", "city", "didn't", "order", "away", "called",
				"want", "eyes", "something", "unite", "going", "face", "far", "asked", "interest", "later", "show",
				"knew", "though", "less", "night", "early", "almost", "let", "open", "enough", "side", "case", "days",
				"yet", "better", "nothing", "tell", "problem", "toward", "given", "why", "national", "room", "young",
				"social", "light", "business", "president", "help", "power", "country", "next", "things", "word",
				"looked", "real", "John", "line", "second", "church", "seem", "certain", "big", "Four", "felt",
				"several", "children", "service", "feel", "important", "rather", "name", "per", "among", "often",
				"turn", "development", "developmentcomputer", "keep", "family", "seemed", "white", "company", "mind",
				"members", "others", "within", "done", "along", "turned", "god", "sense", "week", "best", "change",
				"kind", "began", "child", "ever", "law", "matter", "least", "means", "question", "act", "close", "mean",
				"leave", "itself", "force", "study", "York", "action", "it's", "door", "experience", "human", "result",
				"times", "run", "different", "car", "example", "hands", "whole", "center", "although", "call", "Five",
				"inform", "gave", "plan", "woman", "boy", "feet", "provide", "taken", "thus", "body", "play", "seen",
				"today", "having", "cost", "perhaps", "field", "local", "really", "am", "increase", "reason",
				"themselves", "clear", "I'm", "information", "figure", "late", "above", "history", "love", "girl",
				"held", "special", "move", "person", "whether", "college", "sure", "probably", "either", "seems",
				"cannot", "art", "free", "across", "death", "quite", "street", "value", "anything", "making", "past",
				"brought", "moment", "control", "office", "heard", "problems", "became", "full", "near", "half",
				"nature", "hold", "live", "available", "known", "board", "effect", "already", "Economic", "money",
				"position", "believe", "age", "together", "shall", "TRUE", "political", "court", "report", "level",
				"rate", "air", "pay", "community", "complete", "music", "necessary", "society", "behind", "type",
				"read", "idea", "wanted", "land", "party", "class", "organize", "return", "department", "education",
				"following", "mother", "sound", "ago", "nation", "voice", "six", "bring", "wife", "common", "south",
				"strong", "town", "book", "students", "hear", "hope", "able", "industry", "stand", "tax", "west",
				"meet", "particular", "cut", "short", "stood", "university", "spirit", "start", "total", "future",
				"front", "low", "century", "Washington", "usually", "care", "recent", "evidence", "further", "million",
				"simple", "road", "sometimes", "support", "view", "fire", "says", "hard", "morning", "table", "left",
				"situation", "try", "outside", "lines", "surface", "ask", "modern", "top", "peace", "personal",
				"member", "minutes", "lead", "schools", "talk", "consider", "gone", "soon", "father", "ground",
				"living", "months", "therefore", "America", "started", "longer", "Dr", "dark", "various", "finally",
				"hour", "north", "third", "fall", "greater", "pressure", "stage", "expected", "secretary", "needed",
				"That's", "kept", "eye", "values", "union", "private", "alone", "black", "required", "space", "subject",
				"english", "month", "understand", "I'll", "nor", "answer", "moved", "amount", "conditions", "direct",
				"red", "student", "rest", "nations", "heart", "costs", "record", "picture", "taking", "couldn't",
				"hours", "deal", "forces", "everything", "write", "coming", "effort", "market", "island", "wall",
				"purpose", "basis", "east", "lost", "St", "except", "letter", "looking", "property", "Miles",
				"difference", "entire", "else", "color", "followed", "feeling", "son", "makes", "friend", "basic",
				"cold", "including", "single", "attention", "note", "cause", "hundred", "step", "paper", "developed",
				"tried", "simply", "can't", "story", "committee", "inside", "reached", "easy", "appear", "include",
				"accord", "Actually", "remember", "beyond", "dead", "shown", "fine", "religious", "continue", "ten",
				"defense", "getting", "Central", "beginning", "instead", "river", "received", "doing", "employ",
				"trade", "terms", "trying", "friends", "sort", "administration", "higher", "cent", "expect", "food",
				"building", "religion", "meeting", "ready", "walked", "follow", "earth", "speak", "passed", "foreign",
				"NATURAL", "medical", "training", "County", "list", "floor", "piece", "especially", "indeed", "stop",
				"wasn't", "England", "difficult", "likely", "Suddenly", "moral", "plant", "bad", "club", "needs",
				"international", "working", "countries", "develop", "drive", "reach", "police", "sat", "charge", "farm",
				"fear", "test", "determine", "hair", "results", "stock", "trouble", "happened", "growth", "square",
				"William", "cases", "effective", "serve", "miss", "involved", "doctor", "earlier", "increased", "being",
				"blue", "hall", "particularly", "boys", "paid", "sent", "production", "district", "using", "thinking",
				"concern", "Christian", "press", "girls", "wide", "usual", "direction", "feed", "trial", "walk",
				"begin", "weeks", "points", "respect", "certainly", "ideas", "industrial", "methods", "operation",
				"addition", "association", "combine", "knowledge", "decided", "temperature", "statement", "Yes",
				"below", "game", "nearly", "science", "directly", "horse", "influence", "size", "showed", "build",
				"throughout", "questions", "character", "foot", "Kennedy", "firm", "reading", "husband", "doubt",
				"services", "according", "lay", "stay", "programs", "anyone", "average", "French", "spring", "former",
				"summer", "bill", "lot", "chance", "due", "comes", "army", "actual", "Southern", "neither", "relate",
				"rise", "evening", "normal", "wish", "visit", "population", "remain", "measure", "merely", "arrange",
				"condition", "decision", "account", "opportunity", "pass", "demand", "strength", "window", "active",
				"deep", "degree", "ran", "western", "E", "sales", "continued", "fight", "heavy", "arm", "standard",
				"generally", "carry", "hot", "provided", "serious", "led", "wait", "hotel", "opened", "performance",
				"maybe", "station", "changes", "literature", "marry", "claim", "works", "bed", "wrong", "main", "unit",
				"George", "hit", "planning", "supply", "systems", "add", "chief", "officer", "Soviet", "pattern",
				"stopped", "price", "success", "lack", "myself", "truth", "freedom", "manner", "quality", "gun",
				"manufacture", "clearly", "share", "movement", "length", "ways", "burn", "forms", "Organization",
				"break", "somewhat", "efforts", "cover", "meaning", "progress", "treatment", "beautiful", "placed",
				"happy", "attack", "apparently", "blood", "groups", "carried", "sign", "radio", "dance", "I've",
				"regard", "man's", "train", "herself", "numbers", "corner", "REACTION", "immediately", "language",
				"running", "recently", "shake", "larger", "lower", "machine", "attempt", "learn", "couple", "race",
				"audience", "Oh", "middle", "brown", "date", "health", "persons", "understanding", "arms", "daily",
				"suppose", "additional", "hospital", "pool", "technical", "served", "declare", "described", "current",
				"poor", "steps", "reported", "sun", "based", "produce", "determined", "receive", "park", "staff",
				"faith", "responsibility", "Europe", "latter", "British", "season", "equal", "learned", "practice",
				"green", "writing", "ones", "choice", "fiscal", "term", "watch", "scene", "activity", "product",
				"types", "ball", "heat", "clothe", "lived", "distance", "parent", "letters", "returned", "forward",
				"obtained", "offer", "specific", "straight", "fix", "division", "slowly", "shot", "poet", "seven",
				"moving", "mass", "plane", "proper", "propose", "drink", "obviously", "plans", "whatever", "afternoon",
				"figures", "parts", "approve", "saying", "born", "immediate", "fame", "gives", "extent", "justice",
				"cars", "mark", "pretty", "opinion", "ahead", "glass", "refuse", "enter", "completely", "send",
				"desire", "judge", "none", "waiting", "popular", "Democratic", "film", "mouth", "Corps", "importance",
				"touch", "director", "ship", "there's", "council", "EFFECTS", "event", "worth", "existence", "designed",
				"hardly", "indicated", "analysis", "established", "products", "growing", "patient", "rule", "bridge",
				"pain", "base", "check", "cities", "elements", "leaders", "discussion", "limited", "sit", "Thomas",
				"agreement", "gas", "factors", "marriage", "easily", "closed", "excite", "accept", "applied", "allow",
				"bit", "married", "oil", "Rhode", "shape", "interested", "strange", "compose", "professional",
				"remained", "news", "Despite", "beauty", "responsible", "wonder", "spent", "tear", "unless", "eight",
				"permit", "covered", "Negro", "played", "I'd", "vote", "balance", "Charles", "loss", "Commission",
				"original", "fair", "reasons", "studies", "exactly", "built", "behavior", "enemy", "teeth", "bank",
				"die", "James", "relations", "weight", "prepared", "related", "sea", "bar", "warn", "post", "trees",
				"official", "separate", "clay", "Sunday", "raised", "events", "thin", "dropped", "cattle", "invite",
				"playing", "prevent", "detail", "standing", "grow", "places", "someone", "bright", "Talking", "meant",
				"print", "capital", "happen", "sides", "everyone", "facilities", "filled", "lip", "essential",
				"techniques", "June", "knows", "stain", "hadn't", "dinner", "dog", "dollars", "caught", "shout", "buy",
				"divide", "entered", "Chicago", "speed", "jazz", "appoint", "governor", "institutions", "fit",
				"materials", "sight", "store", "dependence", "explain", "gain", "he'd", "leadership", "quiet",
				"realize", "parents", "Communist", "neighbor", "round", "included", "kitchen", "thousand", "Christ",
				"isn't", "radiation", "broad", "stops", "failure", "retire", "election", "primary", "king", "books",
				"command", "edge", "ember", "March", "sitting", "conference", "bottom", "lady", "advise", "churches",
				"model", "battle", "giving", "sport", "address", "considerable", "spread", "funds", "trip", "youth",
				"CONSTRUCTION", "rock", "regular", "changed", "boat", "memory", "successful", "captain", "hell",
				"brother", "murder", "quick", "moreover", "highly", "difficulty", "inch", "saw", "clean", "collect",
				"camp", "experiment", "shows", "Authority", "older", "lord", "variety", "material", "frame",
				"distinguish", "scientific", "introduce", "principal", "Jack", "kill", "collection", "fell",
				"entertain", "pieces", "management", "otherwise", "security", "danger", "entirely", "civil",
				"frequently", "advertise", "records", "secret", "title", "impossible", "yesterday", "fast", "Mike",
				"produced", "favor", "noted", "caused", "lose", "purposes", "solid", "song", "corporation", "lie",
				"winter", "dress", "electric", "key", "dry", "reduce", "fresh", "goes", "hill", "names", "slow",
				"quickly", "telephone", "threaten", "oppose", "deliver", "officers", "expression", "published",
				"famous", "pray", "adopt", "London", "clothes", "laws", "citizens", "announced", "minute", "master",
				"sharp", "advantage", "greatest", "relation", "Mary", "leaving", "gray", "manager", "animal", "object",
				"bottle", "draw", "honor", "recognize", "drop", "intend", "relationship", "opposite", "sources",
				"poetry", "ability", "assistance", "operating", "bear", "join", "climb", "companies", "exist", "fixed",
				"gradual", "possibility", "hunt", "spoke", "satisfy", "units", "neck", "sleep", "doesn't", "finished",
				"carefully", "facts", "nice", "practical", "save", "takes", "allowed", "wine", "remind", "rich",
				"financial", "dream", "knife", "stations", "civilize", "Rose", "cool", "died", "thick", "imagine",
				"literary", "bind", "inches", "earn", "familiar", "seeing", "distribution", "marked", "coffee", "rules",
				"slip", "apply", "page", "beside", "daughter", "Relatively", "classes", "explore", "stated", "German",
				"musical", "smile", "significant", "block", "mix", "reports", "PROPOSED", "shelter", "presence",
				"Affairs", "named", "ordinary", "circumstances", "mile", "sweep", "remains", "admire", "Catholic",
				"dust", "operations", "rain", "tree", "nobody", "Henry", "Robert", "village", "advance", "offered",
				"agree", "mechanic", "upper", "occasion", "requirements", "capacity", "appears", "travel", "article",
				"houses", "valley", "beat", "opening", "box", "evil", "succeed", "surround", "application", "slightly",
				"remembered", "interests", "warm", "subjects", "search", "presented", "shoe", "sweet", "interesting",
				"membership", "suggest", "notice", "connection", "extreme", "exchange", "flow", "spend", "everybody",
				"poems", "campaign", "win", "forced", "freeze", "nine", "eat", "newspaper", "please", "escape", "lives",
				"swim", "file", "wind", "provides", "shop", "apartment", "fashion", "reasonable", "created", "Germany",
				"watched", "cells", "session", "somehow", "fully", "whose", "teacher", "raise", "recognized", "unity",
				"Providence", "reference", "explained", "twenty", "Russian", "features", "shoulder", "sir", "forest",
				"studied", "Sam", "signal", "chair", "reduced", "procedure", "forth", "limit", "disturb", "universe",
				"mentioned", "pick", "reality", "differences", "soft", "traditional", "Mission", "flat", "looks",
				"picked", "weather", "smaller", "leg", "chairman", "ancient", "narrow", "fellow", "twist", "belief",
				"excellent", "rights", "vocational", "laid", "politics", "fill", "response", "struggle", "disappear",
				"prove", "duty", "FOLLOWS", "editor", "welcome", "anode", "possess", "hearing", "BUILDINGS", "ideal",
				"scientist", "formed", "watching", "circle", "ought", "garden", "library", "accuse", "message",
				"slight", "junior", "knock", "empty", "protection", "treated", "birth", "expressed", "planned",
				"choose", "confuse", "Virginia", "killed", "frighten", "stayed", "worry", "surprise", "aside",
				"photograph", "removed", "turning", "Jr", "pull", "personnel", "agency", "pointed", "speech", "listen",
				"November", "sample", "Louis", "motor", "selected", "Berlin", "CLAIMS", "spot", "strike", "increasing",
				"exercise", "handle", "hole", "Leader", "baby", "ride", "avoid", "cross", "twice", "commercial",
				"failed", "prompt", "fat", "fourth", "visitor", "interior", "Jewish", "wing", "desk", "faculty",
				"forget", "operate", "stair", "besides", "relief", "standards", "France", "perfect", "pour",
				"Nevertheless", "brief", "Jones", "kick", "attend", "plus", "solution", "wage", "individuals", "powers",
				"minister", "taste", "discovered", "pulled", "hire", "writer", "verb", "preach", "friendly", "observed",
				"fan", "connect", "Fig", "count", "egg", "items", "mention", "Texas", "calculate", "platform", "drag",
				"mere", "tomorrow", "faces", "pure", "fighting", "resources", "increases", "assumed", "broke", "coast",
				"strict", "whom", "Russia", "qualify", "Morgan", "victory", "fields", "pleasure", "contain", "fold",
				"review", "April", "teach", "Richard", "whisper", "chosen", "metal", "PRINCIPLES", "competition",
				"railroad", "safe", "proved", "carrying", "horses", "kiss", "Mercer", "wheel", "sail", "wants",
				"compared", "relieve", "approximately", "wood", "historical", "persuade", "smiled", "crowd", "motion",
				"shore", "suit", "calls", "seat", "deserve", "San", "snow", "double", "educational", "neighborhood",
				"relative", "teachers", "Independent", "puzzle", "nose", "dogs", "waited", "naturally", "stone",
				"origin", "Rome", "wild", "scale", "tremble", "drawn", "guess", "communism", "absence", "roof",
				"sections", "sky", "walls", "Aircraft", "complain", "independence", "busy", "elect", "revolution",
				"roar", "willing", "League", "mine", "nurse", "liberal", "completed", "poem", "dollar", "ordered",
				"levels", "ton", "settled", "allowance", "bitter", "realized", "let's", "moon", "sensitive", "servant",
				"hunger", "China", "sale", "appearance", "lips", "policies", "actions", "strengthen", "Monday", "onto",
				"directed", "leading", "machinery", "theater", "Paris", "Frank", "somewhere", "Statements", "mill",
				"projects", "starting", "hat", "ruin", "depend", "stands", "signs", "families", "stir", "Khrushchev",
				"largely", "punish", "drew", "breathe", "amuse", "characteristic", "electronic", "pale", "pictures",
				"destroy", "expense", "somebody", "completion", "disappoint", "fifty", "found", "soil", "flame",
				"enjoy", "bless", "emotional", "promise", "she'd", "wave", "commerce", "Jury", "bay", "tempt",
				"correct", "asking", "content", "estimated", "conscious", "shine", "teaching", "catch", "dish",
				"Saturday", "greet", "background", "flood", "insect", "worse", "yellow", "occurred", "afraid",
				"ceremony", "decrease", "trust", "yourself", "legs", "you've", "communication", "describe", "sincere",
				"decide", "leaf", "encourage", "rub", "declared", "cry", "bite", "July", "lung", "significance",
				"helped", "gross", "apart", "disease", "issues", "scratch", "dictionary", "risk", "broadcast", "drum",
				"representative", "uncle", "cutting", "Jesus", "neglect", "depth", "substantial", "GETS", "adventure",
				"beg", "entrance", "plays", "throw", "ends", "Arts", "alive", "confidence", "intellectual", "cheer",
				"properties", "experiments", "nut", "plenty", "beneath", "closely", "description", "melt", "swear",
				"tall", "loose", "area", "bury", "measured", "request", "ourselves", "stream", "wipe", "band",
				"fingers", "creature", "Hanover", "attorney", "load", "passing", "billion", "earnest", "discussed",
				"translate", "achievement", "headquarters", "inquiry", "rapidly", "express", "hesitate", "guard",
				"jobs", "borrow", "owe", "Phil", "California", "ambition", "supposed", "lake", "they're", "slope",
				"Typical", "spite", "wore", "dear", "employees", "map", "pair", "spin", "one's", "praise",
				"imagination", "hung", "instrument", "plow", "holding", "objects", "straighten", "dominant", "scarce",
				"ring", "matters", "creep", "plain", "resolution", "credit", "period", "improve", "maintenance",
				"seize", "Laos", "we'll", "dozen", "located", "dig", "towards", "curse", "major", "breath", "weigh",
				"comfort", "federal", "guests", "priest", "sell", "bodies", "female", "primarily", "cousin", "grew",
				"spiritual", "dine", "engine", "politician", "custom", "educate", "individual", "job", "Tom", "cook",
				"grass", "mail", "salesman", "nail", "tap", "wet", "bedroom", "sufficient", "chest", "dramatic",
				"silence", "behave", "breakfast", "sudden", "passage", "scatter", "objection", "unusual", "argument",
				"policy", "powerful", "throat", "formal", "rapid", "Parker", "wrap", "luck", "grind", "rifle",
				"HIGHEST", "loan", "represent", "skill", "spell", "broken", "arch", "angle", "sick", "swell", "blind",
				"Contemporary", "engineer", "military", "boundary", "location", "homes", "boil", "officials",
				"operator", "Senate", "lend", "hearts", "embers", "abused", "resins", "trendy", "ssdsy" };
		return wordList;
	}
}

import java.util.*;

interface ShoppingCart {
    void addItem(String itemType, int number);

    void printReceipt();
}

class TT7 implements ShoppingCart {

    private class Item {
        private String name;
        private double price;

        public Item(String n, double p) {
            name = n;
            price = p;
        }
    }

    private class LineItem {
        private Item item;
        private int quantity;

        public LineItem(Item i, int q) {
            item = i;
            quantity = q;
        }

        public double getPrice() {
            return item.price;
        }

        public int getQuantity() {
            return quantity;
        }

        public String toString() {
            return String.format("%-20s$%-19.2f%-20s$%.2f", item.name, item.price, quantity, item.price * quantity);
        }
    }

    private List<LineItem> lineItems;
    private Map<String, Double> itemPrices;
    private double grandTotal;

    public TT7() {
        grandTotal = 0.0;
        lineItems = new ArrayList<>();
        itemPrices = new HashMap<>();

        itemPrices.put("Apple", 0.30);
        itemPrices.put("Pear", 1.20);
    }

    public void addItem(String itemType, int number) {
        double itemPrice = itemPrices.getOrDefault(itemType, 0.0);
        lineItems.add(new LineItem(new Item(itemType, itemPrice), number));
    }

    public void printReceipt() {
        printReceiptHeader();

        for (LineItem li : lineItems) {
            System.out.println(li);
            grandTotal += (li.getPrice() * li.getQuantity());
        }

        printGrandTotal(grandTotal);
    }

    private void printReceiptHeader() {
        System.out.printf("%-20s%-20s%-20s%-20s\n", "Item", "Unit price", "Quantity", "Total");
    }

    private void printGrandTotal(double grandTotal) {
        System.out.printf("\n%-60s$%-20.2f\n", "Total:", grandTotal);
    }

    public static void main(String[] args) {
        TT7 tt7 = new TT7();

        tt7.addItem("Pear", 2);
        tt7.addItem("Apple", 3);

        tt7.printReceipt();
        return;
    }
}
// app/checkout/page.tsx
"use client";
import { useCart } from "@/stores/useCart";
import styles from "@/styles/Checkout.module.css";


export default function CheckoutPage() {
  const items = useCart(s => s.items);
  const setQuantity = useCart(s => s.setQuantity);
  const removeItem = useCart(s => s.removeItem);
  const clear = useCart(s => s.clear);
  const total = useCart(s => s.total)();

  return (
    <section>
      <h1>Checkout</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className={styles.list}>
            {items.map(it => (
              <div key={it.id} className={styles.row}>
                <img src={it.image} alt={it.title} className={styles.thumb} />
                <div style={{ flex: 1 }}>
                  <div>{it.title}</div>
                  <div>${it.price.toFixed(2)}</div>
                </div>
                <input type="number" min={1} value={it.quantity} onChange={(e) => setQuantity(it.id, Math.max(1, Number(e.target.value)))} style={{ width:80 }} />
                <button onClick={() => removeItem(it.id)}>Remove</button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={() => alert("Simulate payment — integrate Stripe or other provider")}>Proceed to Payment</button>
            <button onClick={() => clear()} style={{ marginLeft: 8 }}>Clear cart</button>
          </div>
        </>
      )}
    </section>
  );
}

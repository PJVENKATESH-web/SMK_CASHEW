import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, WalletCards } from 'lucide-react';

function Home() {
  return (
    <section className="space-y-10">
      <div className="grid items-center gap-8 rounded-lg bg-white p-8 shadow-sm lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Premium cashews
          </p>

          <h1 className="mt-3 text-4xl font-bold text-stone-950">
            Fresh cashews for snacking, cooking, and gifting.
          </h1>

          <p className="mt-4 max-w-2xl text-stone-600">
            Browse raw, roasted, salted, organic, and flavored cashews
            selected for quality and freshness.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-amber-700 px-5 py-3 font-semibold text-white hover:bg-amber-800"
          >
            Shop Products
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="flex aspect-square items-center justify-center rounded-lg bg-amber-50 p-6">
          <div className="text-center">
            <p className="text-6xl font-bold text-amber-800">
              SMK
            </p>

            <p className="mt-2 text-lg font-semibold text-stone-800">
              CASHEW
            </p>

            <p className="mt-2 text-sm text-stone-600">
              Premium quality. Simple ordering.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <ShieldCheck className="text-amber-700" />

          <h2 className="mt-3 font-semibold text-stone-900">
            Quality Checked
          </h2>

          <p className="mt-1 text-sm text-stone-600">
            Products are selected and packed with freshness in mind.
          </p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <Truck className="text-amber-700" />

          <h2 className="mt-3 font-semibold text-stone-900">
            Easy Delivery
          </h2>

          <p className="mt-1 text-sm text-stone-600">
            A smooth cart and checkout flow for customer orders.
          </p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <WalletCards className="text-amber-700" />

          <h2 className="mt-3 font-semibold text-stone-900">
            Ready for Payments
          </h2>

          <p className="mt-1 text-sm text-stone-600">
            Built to support online payment integration in the next phase.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
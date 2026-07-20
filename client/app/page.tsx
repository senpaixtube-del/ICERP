export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070D] text-white">

      <section className="text-center py-24">

        <h2 className="text-6xl font-bold text-cyan-400">
          ICERP RP
        </h2>

        <p className="mt-5 text-xl text-gray-300">
          The Future Of RolePlay
        </p>

      </section>


      <section className="grid md:grid-cols-3 gap-6 px-10">

        <div className="bg-[#0D1117] p-6 rounded-2xl border border-cyan-500/20">
          <h3 className="text-cyan-400 text-xl">
            👑 Founder
          </h3>
          <p>Soroush Yousefi</p>
        </div>


        <div className="bg-[#0D1117] p-6 rounded-2xl border border-cyan-500/20">
          <h3 className="text-cyan-400 text-xl">
            👑 Owner
          </h3>
          <p>Sobhan</p>
        </div>


        <div className="bg-[#0D1117] p-6 rounded-2xl border border-cyan-500/20">
          <h3 className="text-cyan-400 text-xl">
            🛡 Manager
          </h3>
          <p>Haj Mousavi Game</p>
        </div>

      </section>


      <section className="mt-20 text-center">

        <h2 className="text-3xl text-cyan-400">
          Support
        </h2>

        <p className="mt-3">
          🎫 Ticket System
        </p>

        <p>
          ☎ 09383399258
        </p>

      </section>


    </main>
  );
}
export default function Rules() {
    const rules = [
        {
            title: "قانون احترام",
            text: "تمامی بازیکنان موظف هستند به بازیکنان دیگر، استاف و مدیریت سرور احترام بگذارند."
        },
        {
            title: "قانون Fail RP",
            text: "انجام کارهایی که خارج از منطق رول‌پلی هستند ممنوع است."
        },
        {
            title: "قانون RDM",
            text: "کشتن بازیکن بدون دلیل و بدون سناریوی رول‌پلی ممنوع می‌باشد."
        },
        {
            title: "قانون VDM",
            text: "استفاده از وسیله نقلیه برای آسیب زدن بدون دلیل رول‌پلی ممنوع است."
        },
        {
            title: "قانون Power Gaming",
            text: "انجام کارهایی که در دنیای واقعی غیرممکن است و سوءاستفاده از امکانات بازی ممنوع است."
        },
        {
            title: "قانون Meta Gaming",
            text: "استفاده از اطلاعات خارج از بازی در داخل رول‌پلی ممنوع می‌باشد."
        },
        {
            title: "قوانین مدیریت",
            text: "تصمیمات مدیریت ICERP برای حفظ نظم سرور باید رعایت شود."
        }
    ];


    return (
        <main className="min-h-screen bg-[#05070D] text-white p-8">

            <div className="text-center mb-12">

                <h1 className="text-5xl font-bold text-cyan-400">
                    ❄️ ICERP Rules
                </h1>

                <p className="mt-4 text-gray-400 text-lg">
                    قوانین رسمی سرور ICERP RolePlay
                </p>

            </div>


            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

                {rules.map((rule, index) => (

                    <div
                        key={index}
                        className="bg-[#0D1117] p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400 transition"
                    >

                        <h2 className="text-2xl text-cyan-400 font-bold mb-3">
                            {index + 1}. {rule.title}
                        </h2>

                        <p className="text-gray-300">
                            {rule.text}
                        </p>

                    </div>

                ))}

            </div>


            <div className="text-center mt-12">

                <p className="text-cyan-400 text-xl">
                    ❄️ ICERP | The Future Of RolePlay
                </p>

            </div>


        </main>
    );
}
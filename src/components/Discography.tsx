"use client";

const works = [
  {
    title: "夏、嘘をついたぜ",
    event: "最新作",
    price: "—",
    desc: "夏の嘘。その甘く苦い感触を、合成音声とギターで閉じこめた一枚。",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/7558547/1cdf3950-edfc-42fa-afa3-39fa2061752e_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/7558547",
  },
  {
    title: "晴天に一羽",
    event: "M3-2025春",
    price: "¥200",
    desc: "青空にただ一羽、静かに舞う鳥のような清澄さ。合成音声とギターが織りなす作品。",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/6822016/3c953147-18ae-4daf-9ab6-9c67ebddadda_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/6822016",
  },
  {
    title: "シュレーディンガーの星",
    event: "M3-2024秋",
    price: "¥200",
    desc: "観測されるまで存在しない星。量子論的な問いを、静かなメロディに乗せた一枚。",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/6208804/f3e9d471-84fe-4965-977e-87bff77e38f7_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/6208804",
  },
  {
    title: "花明かり",
    event: "M3-2024春",
    price: "¥200",
    desc: "夜桜の下、ほのかに浮かぶ光。春の夜の揺らぎを音に閉じこめた作品。",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/5660837/5bb9dfa8-4ef6-4475-bb48-15e7d932b92a_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/5660837",
  },
  {
    title: "月面鈍行",
    event: "M3-2023春",
    price: "¥500",
    desc: "月面をゆっくり走る列車のように、どこか遠い場所へ連れて行ってくれる一枚。",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/4724535/8e638382-2a73-4318-85c6-5b3b8daa0f25_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/4724535",
  },
  {
    title: "忘憂のもの",
    event: "M3-2022秋",
    price: "¥500",
    desc: "憂いを忘れさせるもの——その問いへの答えを、繊細な音で綴った作品。",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/4267952/f1456c31-fa04-4efc-8d9e-5fcbbb2f2077_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/4267952",
  },
  {
    title: "憑き身に憂",
    event: "M3-2022秋",
    price: "無料",
    desc: "もちもちうさぎパレードの原点の一つ。憑かれた身の憂いを音に込めた無料配布作品。",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/3826662/7bc4c6bc-d243-4b53-9293-055afce514b3_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/3826662",
  },
  {
    title: "空中分解する春",
    event: "M3-2022春",
    price: "¥500 / 無料DL版あり",
    desc: "ばらばらに崩れていく春の景色。感情の分解と再構築をテーマにした意欲作。",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/3809571/69799000-987d-433e-a4f5-a4ebc7e21ce1_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/3809571",
  },
  {
    title: "月見に卯",
    event: "M3-2021秋",
    price: "無料",
    desc: "月を見上げながら、うさぎのことを思う。静かな夜の無料配布作品。",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/3318343/555e644d-be7a-4314-839c-b5023a54f0ec_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/3318343",
  },
  {
    title: "嘘憑き EP",
    event: "M3-2021春",
    price: "¥100 / 無料DL版あり",
    desc: "嘘と憑依が溶け合う世界。サークル初期の瑞々しい感性が光るEP作品。",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/2898014/71b597c0-3210-47c0-bae7-081217be7524_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/2898014",
  },
  {
    title: "VOICEROIDとうるさいギター",
    event: "—",
    price: "無料",
    desc: "VOICEROIDとギターのぶつかりあい。サークルのコンセプトを象徴する原点的フリー作品。",
    img: "https://booth.pximg.net/c/300x300_a2_g5/79faddcc-0781-49fb-bd28-11cb82dafc14/i/2800198/b4fd0b5c-433a-49af-a872-738b85fb065f_base_resized.jpg",
    href: "https://torosanshin.booth.pm/items/2800198",
  },
];

export default function Discography() {
  return (
    <section
      id="discography"
      style={{
        padding: "6rem 2rem",
        background: "var(--bg-dark)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <span className="section-label">Discography</span>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {works.map((w, i) => (
            <a
              key={i}
              href={w.href}
              target="_blank"
              rel="noopener noreferrer"
              className="vintage-card"
              style={{
                padding: "0",
                textDecoration: "none",
                color: "var(--fg)",
                display: "block",
              }}
            >
              {/* album art */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  position: "relative",
                  background: "#c0b0a0",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.img}
                  alt={w.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "sepia(0.15) saturate(0.9)",
                    transition: "transform 0.4s ease, filter 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                    (e.currentTarget as HTMLImageElement).style.filter = "sepia(0) saturate(1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLImageElement).style.filter = "sepia(0.15) saturate(0.9)";
                  }}
                />
                {/* vignette overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.2) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* info */}
              <div style={{ padding: "0.75rem 1rem 0.9rem" }}>
                <div
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    color: "var(--fg-muted)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {w.event}
                </div>
                <h3
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--fg)",
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  {w.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

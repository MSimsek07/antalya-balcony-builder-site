
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Check, Users, Award, ThumbsUp, ClipboardCheck } from "lucide-react";

const AboutPage = () => {
  const milestones = [
    {
      year: "2009",
      title: "Firmamızın Kuruluşu",
      description: "Antalya'da küçük bir atölyede cam balkon sistemleri üretimi ve montajı ile faaliyetlerimize başladık."
    },
    {
      year: "2012",
      title: "PVC Pencere Üretimine Başlangıç",
      description: "Ürün yelpazemizi genişleterek PVC pencere ve kapı sistemleri üretimine başladık."
    },
    {
      year: "2015",
      title: "Yeni Üretim Tesisi",
      description: "Artan talep doğrultusunda daha büyük ve modern bir üretim tesisine taşındık."
    },
    {
      year: "2018",
      title: "ISO 9001 Kalite Sertifikası",
      description: "Kalite standartlarımızı belgeleyerek ISO 9001 Kalite Yönetim Sistemi sertifikasını aldık."
    },
    {
      year: "2022",
      title: "Dijital Dönüşüm",
      description: "Üretim süreçlerimizi dijitalleştirerek daha verimli ve hızlı hizmet sunmaya başladık."
    }
  ];

  return (
    <Layout>
      <Hero
        title="Hakkımızda"
        subtitle="2009 yılından beri Antalya'da cam balkon ve PVC pencere sistemleri alanında kaliteli hizmet sunuyoruz."
        image="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />

      {/* About Us Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Firmamız Hakkında</h2>
              <p className="text-gray-600 mb-6">
                Cam Balkon Antalya olarak, 2009 yılından bu yana Antalya ve çevresinde yüksek kaliteli cam balkon, PVC pencere ve kapı sistemleri, ofis bölme sistemleri, sineklik ve panjur sistemleri üretimi ve montajı yapıyoruz.
              </p>
              <p className="text-gray-600 mb-6">
                Kurulduğumuz günden bu yana kaliteden ödün vermeden, müşteri memnuniyetini ön planda tutarak hizmet veriyoruz. Deneyimli ekibimiz ve modern üretim tesisimiz ile her projeye özel çözümler sunuyoruz.
              </p>
              <p className="text-gray-600 mb-6">
                Firmanın kurucuları Mehmet ve Ahmet Yılmaz kardeşler, sektördeki 20 yıllık deneyimleriyle, müşterilerimizin beklentilerini en üst düzeyde karşılamak için çalışıyorlar. Kaliteli malzeme kullanımı, zamanında teslimat ve profesyonel montaj hizmetleri firmamızın temel prensipleridir.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Cam Balkon Antalya Ekibi"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-blue mb-4">Değerlerimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              İşimizi yaparken bizi yönlendiren temel değerlerimiz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-theme-teal/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <Check className="h-8 w-8 text-theme-teal" />
              </div>
              <h3 className="text-xl font-bold text-theme-blue mb-3">Kalite</h3>
              <p className="text-gray-600">
                En iyi malzemeler ve işçilik ile uzun ömürlü ürünler sunuyoruz.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-theme-teal/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <Users className="h-8 w-8 text-theme-teal" />
              </div>
              <h3 className="text-xl font-bold text-theme-blue mb-3">Müşteri Odaklılık</h3>
              <p className="text-gray-600">
                Müşteri memnuniyeti bizim için en önemli başarı ölçütüdür.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-theme-teal/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <Award className="h-8 w-8 text-theme-teal" />
              </div>
              <h3 className="text-xl font-bold text-theme-blue mb-3">Güvenilirlik</h3>
              <p className="text-gray-600">
                Verdiğimiz sözleri tutar, dürüstlükten asla taviz vermeyiz.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="bg-theme-teal/10 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
                <ThumbsUp className="h-8 w-8 text-theme-teal" />
              </div>
              <h3 className="text-xl font-bold text-theme-blue mb-3">Yenilikçilik</h3>
              <p className="text-gray-600">
                Sektördeki yenilikleri takip eder, sürekli kendimizi geliştiririz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-theme-blue mb-4">Kilometre Taşlarımız</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Firmamızın kuruluşundan bugüne kadar geçirdiği önemli aşamalar
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
            
            {/* Timeline Items */}
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative z-10 flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
              >
                {/* Year Bubble */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-theme-teal flex items-center justify-center text-white font-bold shadow-lg">
                    {milestone.year}
                  </div>
                </div>
                
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "pl-8"}`}>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-theme-blue mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Empty space for the other side */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-theme-blue text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="bg-theme-teal/20 p-3 rounded-full mr-4">
                  <ClipboardCheck className="h-8 w-8 text-theme-teal" />
                </div>
                <h3 className="text-2xl font-bold">Misyonumuz</h3>
              </div>
              <p className="text-white/90">
                Müşterilerimize en kaliteli malzemelerle, estetik ve fonksiyonel çözümler sunarak yaşam alanlarını daha konforlu hale getirmek. Zamanında teslimat, profesyonel montaj ve satış sonrası destek ile müşteri memnuniyetini en üst düzeyde tutmak.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="bg-theme-teal/20 p-3 rounded-full mr-4">
                  <Award className="h-8 w-8 text-theme-teal" />
                </div>
                <h3 className="text-2xl font-bold">Vizyonumuz</h3>
              </div>
              <p className="text-white/90">
                Antalya ve Türkiye genelinde cam balkon ve PVC sistemleri sektöründe öncü ve yenilikçi firma olmak. Üretim kapasitemizi ve hizmet kalitemizi sürekli artırarak, ulusal pazarda lider konuma gelmek ve uluslararası pazarda rekabet edebilen bir marka haline gelmek.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;

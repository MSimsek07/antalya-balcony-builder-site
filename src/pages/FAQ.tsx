
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Accordion from "@/components/Accordion";

const FAQPage = () => {
  const faqItems = [
    {
      title: "Cam balkon sistemleri hangi ortalama ömrü var?",
      content: "Kaliteli malzemelerle üretilen ve doğru monte edilen cam balkon sistemleri 15-20 yıl sorunsuz kullanılabilir. Düzenli bakım ve temizlik yapıldığında bu süre daha da uzayabilir."
    },
    {
      title: "Cam balkon sistemleri nasıl temizlenir?",
      content: "Cam balkon sistemleri temizliği için ılık sabunlu su ve yumuşak bez kullanılabilir. Aşındırıcı kimyasallardan ve sert temizlik malzemelerinden kaçınılmalıdır. Profiller için özel alüminyum temizleyicileri tercih edilebilir."
    },
    {
      title: "Kışın cam balkon içi neden buğulanıyor?",
      content: "Buğulanma, iç ve dış ortam arasındaki sıcaklık farkından kaynaklanır. Yoğuşmanın önüne geçmek için ısı yalıtımlı cam sistemleri tercih edilebilir veya düzenli havalandırma yapılabilir."
    },
    {
      title: "Cam balkon sistemlerinde hangi cam türleri kullanılabilir?",
      content: "Cam balkon sistemlerinde genellikle 8mm temperli cam kullanılır. İstenirse lamine cam, ısı cam veya farklı özellikli cam türleri de tercih edilebilir. Güvenlik ve dayanıklılık için temperli cam önerilmektedir."
    },
    {
      title: "Cam balkon montaj süreci ne kadar sürer?",
      content: "Standart bir balkon için cam balkon montajı genellikle 1-2 gün içinde tamamlanır. Projenin büyüklüğüne ve özel detaylarına göre bu süre değişebilir."
    },
    {
      title: "PVC pencere ve kapılar için hangi cam türleri kullanılabilir?",
      content: "PVC sistemlerde genellikle çift cam veya üç cam kullanılır. İstenilen yalıtım düzeyine göre argon gazlı, low-e kaplamalı, güneş kontrol kaplamalı veya lamine cam seçenekleri tercih edilebilir."
    },
    {
      title: "Isıcamlı PVC pencerelerin avantajları nelerdir?",
      content: "Isıcamlı PVC pencereler yüksek ısı ve ses yalıtımı sağlar, enerji tasarrufu sunar, bakım gerektirmez, uzun ömürlüdür ve farklı renk seçenekleriyle estetik görünüm sağlar."
    },
    {
      title: "Sineklik sistemleri PVC pencere ve cam balkonlara sonradan eklenebilir mi?",
      content: "Evet, sineklik sistemleri sonradan da eklenebilir. Pencere veya kapının türüne göre stor sineklik, plise sineklik, menteşeli sineklik veya sabit sineklik seçenekleri uygulanabilir."
    },
    {
      title: "Cam balkon sistemleri rüzgarlı bölgelerde güvenli midir?",
      content: "Evet, doğru profil sistemi ve uygun kalınlıkta temperli cam kullanıldığında, cam balkon sistemleri rüzgarlı bölgelerde güvenle kullanılabilir. Özellikle kilitli sistemler tercih edilebilir."
    },
    {
      title: "Cam balkon montajından önce nelere dikkat etmeliyim?",
      content: "Montaj öncesi balkonun ölçüleri doğru alınmalı, su tahliye sistemi kontrol edilmeli, elektrik tesisatı varsa belirtilmeli ve balkon korkuluklarının sağlamlığı kontrol edilmelidir."
    },
    {
      title: "Garanti kapsamı neleri içerir?",
      content: "Firmamız tüm ürünlerinde 2 yıl garanti sunmaktadır. Garanti kapsamı; üretim hatalarını, profil ve cam sistemlerindeki kusurları, aksesuar ve kilitleme mekanizmalarındaki arızaları içerir. Yanlış kullanım, fiziksel darbe ve doğal afetler garanti kapsamı dışındadır."
    },
    {
      title: "Ödemeler nasıl yapılıyor?",
      content: "Sipariş onayı sonrası %50 peşinat alınmaktadır. Kalan ödeme montaj tamamlandıktan sonra yapılabilir. Nakit, havale/EFT veya kredi kartı ile ödeme seçenekleri mevcuttur. Ayrıca, anlaşmalı bankalarla 12 aya varan taksit imkanı sunulmaktadır."
    }
  ];

  return (
    <Layout>
      <Hero
        title="Sıkça Sorulan Sorular"
        subtitle="Cam balkon ve PVC sistemleri hakkında merak ettiğiniz tüm soruların cevapları burada."
        image="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
      />

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title mb-12">Cam Balkon ve PVC Sistemleri Hakkında</h2>
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;

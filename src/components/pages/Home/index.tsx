import MainTemPlate from "../../templates/MainTemPlate";
import "./styles.scss";
import landingImg from "../../../assets/home/landing_page_top_image.webp";
import customersImg from "../../../assets/home/customers.webp";
import product01 from "../../../assets/home/product_01.svg";
import product02 from "../../../assets/home/product_02.svg";
import product03 from "../../../assets/home/product_03.svg";
import product04 from "../../../assets/home/product_04.svg";
import product05 from "../../../assets/home/product_05.svg";
import logoRolandBerger from "../../../assets/home/logo-roland-berger.webp";
import logoSaigonFood from "../../../assets/home/logo-saigon-food.webp";
import logoTtsMedia from "../../../assets/home/logo-tts-media.webp";
import logoOtoComVn from "../../../assets/home/logo-oto-com-vn.webp";
import logoTinhte from "../../../assets/home/logo-tinhte.webp";
import logoTruongHoaBinh from "../../../assets/home/logo-truong-hoa-binh.webp";
import logoSonion from "../../../assets/home/logo-sonion.webp";
import logoBaovietNhanTho from "../../../assets/home/logo-baovietnhantho.webp";
import logoMmMegaMarket from "../../../assets/home/logo-mm-mega-market.webp";
import logoHanaBbq from "../../../assets/home/logo-hana-bbq.webp";
import logoVng from "../../../assets/home/logo-vng.webp";
import { useNavigate } from "react-router-dom";
import { routesMap } from "../../../routes/routes";

const projectsData = [
    {
        category: "Nghiên cứu thị trường",
        title: "Khảo sát offline về chuyển đổi số ở Long An",
        logoSrc: logoRolandBerger,
        barColorClass: "research",
    },
    {
        category: "Nghiên cứu thị trường",
        title: "Khảo sát nhanh online về thực phẩm chế biến sẵn",
        logoSrc: logoSaigonFood,
        barColorClass: "research",
    },
    {
        category: "Phần mềm khảo sát",
        title: "Cung cấp phần mềm khảo sát để khách hàng tự thực hiện khảo sát thị trường Offline",
        logoSrc: logoTtsMedia,
        barColorClass: "survey-software",
    },
    {
        category: "Phần mềm khảo sát",
        title: "Cung cấp phần mềm khảo sát trực tuyến để khảo sát trải nghiệm người dùng trên trang Oto.com.vn",
        logoSrc: logoOtoComVn,
        barColorClass: "survey-software",
    },
    {
        category: "Phần mềm khảo sát",
        title: "Cung cấp công cụ bình chọn cho sự kiện lớn Tinh tế Bình Chọn hàng năm",
        logoSrc: logoTinhte,
        barColorClass: "survey-software",
    },
    {
        category: "Trắc nghiệm online",
        title: "Cung cấp nền tảng tạo đề thi trắc nghiệm trực tuyến để giáo viên làm kiểm tra 15p và 1 tiết",
        logoSrc: logoTruongHoaBinh,
        barColorClass: "online-quiz",
    },
    {
        category: "Trắc nghiệm online",
        title: "Cung cấp nền tảng tạo bài kiểm tra tiếng Anh đầu vào trong tuyển dụng nhân sự ở công ty Sonion",
        logoSrc: logoSonion,
        barColorClass: "online-quiz",
    },
    {
        category: "Trắc nghiệm online",
        title: "Cung cấp nền tảng tạo bài kiểm tra nghiệp vụ dựa trên ngân hàng câu hỏi cho Bảo Việt Nhân Thọ",
        logoSrc: logoBaovietNhanTho,
        barColorClass: "online-quiz",
    },
    {
        category: "Khảo sát khách hàng",
        title: "Xây dựng hệ thống VOC (Voice of Customer) khảo sát khách hàng tại chuỗi siêu thị MM Mega Market",
        logoSrc: logoMmMegaMarket,
        barColorClass: "customer-survey",
    },
    {
        category: "Khảo sát khách hàng",
        title: "Xây dựng hệ thống khảo sát khách hàng cho chuỗi nhà hàng đồ nướng Hana BBQ",
        logoSrc: logoHanaBbq,
        barColorClass: "customer-survey",
    },
    {
        category: "Khảo sát nội bộ",
        title: "Khảo sát nội bộ 3000 nhân viên MM Mega Market bằng link khảo sát có mật khẩu truy cập",
        logoSrc: logoMmMegaMarket,
        barColorClass: "internal-survey",
    },
    {
        category: "Khảo sát nội bộ",
        title: "Khảo sát nội bộ 4000 nhân viên VNG",
        logoSrc: logoVng,
        barColorClass: "internal-survey",
    },
];

const Home = () => {
    const navigate = useNavigate();
    return (
        <MainTemPlate>
            <div className="home-page">
                {/* Banner */}
                <section className="home-banner flex flex-col md:flex-row items-center justify-between gap-8 px-8 py-12">
                    <div className="flex-1 flex flex-col gap-4">
                        <h1 className="home-title">
                            NỀN TẢNG <span className="highlight">KHẢO SÁT</span>
                        </h1>
                        <h2 className="home-subtitle">Nghiên cứu thị trường</h2>
                        <p className="home-desc">
                            Phần mềm tạo khảo sát trực tuyến miễn phí, giao diện
                            đẹp, dễ sử dụng trên nhiều thiết bị. Nền tảng nghiên
                            cứu thị trường hoàn toàn tự động giúp tiết kiệm thời
                            gian và chi phí.
                        </p>
                        <button
                            className="home-btn"
                            onClick={() => navigate(routesMap.SurveyNew)}
                        >
                            TẠO KHẢO SÁT NGAY
                        </button>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <img
                            src={landingImg}
                            alt="Landing"
                            className="home-landing-img"
                        />
                    </div>
                </section>

                {/* Customers */}
                <section className="home-customers flex flex-col items-center py-12">
                    <h3 className="home-customers-title">
                        KHÁCH HÀNG CỦA CHÚNG TÔI
                    </h3>
                    <div className="home-customers-underline"></div>
                    <div className="w-full flex justify-center mt-8">
                        <img
                            src={customersImg}
                            alt="Customers"
                            className="home-customers-img"
                        />
                    </div>
                </section>

                {/* Products & Services */}
                <section className="home-products flex flex-col items-center py-12">
                    <h3 className="home-products-title">SẢN PHẨM & DỊCH VỤ</h3>
                    <div className="home-products-underline"></div>

                    <div className="home-products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        <div className="home-product-card">
                            <div className="home-product-content">
                                <h4 className="home-product-title">
                                    PHẦN MỀM
                                    <br />
                                    KHẢO SÁT
                                </h4>
                                <img
                                    src={product01}
                                    alt="Product 1"
                                    className="home-product-img"
                                />
                            </div>
                        </div>

                        <div className="home-product-card">
                            <div className="home-product-content">
                                <h4 className="home-product-title">
                                    TRẮC NGHIỆM
                                    <br />
                                    ONLINE
                                </h4>
                                <img
                                    src={product02}
                                    alt="Product 2"
                                    className="home-product-img"
                                />
                            </div>
                        </div>

                        <div className="home-product-card home-product-card-large lg:col-span-2 lg:row-span-2">
                            <div className="home-product-content">
                                <h4 className="home-product-title text-white">
                                    DỊCH VỤ
                                    <br />
                                    NGHIÊN CỨU
                                    <br />
                                    THỊ TRƯỜNG
                                </h4>
                                <img
                                    src={product05}
                                    alt="Product 5"
                                    className="home-product-img-large"
                                />
                            </div>
                        </div>

                        <div className="home-product-card">
                            <div className="home-product-content">
                                <h4 className="home-product-title">
                                    KHẢO SÁT
                                    <br />
                                    KHÁCH HÀNG
                                </h4>
                                <img
                                    src={product03}
                                    alt="Product 3"
                                    className="home-product-img"
                                />
                            </div>
                        </div>

                        <div className="home-product-card">
                            <div className="home-product-content">
                                <h4 className="home-product-title">
                                    KHẢO SÁT
                                    <br />
                                    NỘI BỘ
                                </h4>
                                <img
                                    src={product04}
                                    alt="Product 4"
                                    className="home-product-img"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Implemented Projects */}
                <section className="home-projects-section flex flex-col items-center py-12">
                    <h3 className="home-section-title">
                        CÁC DỰ ÁN ĐÃ THỰC HIỆN
                    </h3>
                    <div className="home-section-underline"></div>

                    <div className="home-projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        {projectsData.map((project, index) => (
                            <div key={index} className="home-project-card">
                                <div
                                    className={`home-project-bar ${project.barColorClass}`}
                                ></div>
                                <div className="home-project-content">
                                    <div className="flex justify-between items-center">
                                        <span className="home-project-category">
                                            {project.category}
                                        </span>
                                        <img
                                            src={project.logoSrc}
                                            alt={`${project.category} Logo`}
                                            className="home-project-logo"
                                        />
                                    </div>
                                    <h4 className="home-project-title">
                                        {project.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </MainTemPlate>
    );
};

export default Home;

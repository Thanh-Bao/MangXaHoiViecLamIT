import {useState} from 'react'
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from "@mui/material/DialogActions";
import Button from '@mui/material/Button';

const TermAndService = (props) => {

    return (
        <>
            <Dialog
                open={props.openTerm}
                scroll={"paper"}
            >
                <DialogTitle sx={{
                    m: 0, p: 2, display: 'flex',
                    justifyContent: 'center',
                }}>ĐIỀU KHOẢN VÀ DỊCH VỤ</DialogTitle>
                <DialogContent>
                    <DialogContentText
                    >
                        <h3>Điều 1: Đối tượng thành viên tham gia</h3>
                        GoreVN chỉ chấp nhận thành viên trên 18 tuổi, đủ năng lực hành vi dân sự. 
                        Nếu bạn dưới 18 tuổi hoặc đang gặp các vấn đề về tâm lý vui lòng rời khỏi đây.
                        <h3>Điều 2: Miễn trừ trách nhiệm</h3>
                        GoreVN không chịu bất cứ trách nhiệm nào khi bạn truy cập website, chúng tôi không có trách nhiệm với mọi
                        vấn đề phát sinh trong và sau khi bạn truy cập website này. Bạn phải hoàn toàn chịu trách nhiệm
                        với mọi quyết định, hành vi và suy nghĩ của mình, Đồng thời bạn cũng phải tự chịu trách nhiệm
                        khi chia sẻ link, hình ảnh, video của diễn đàn... lên mạng xã hội và các nền tảng internet khác.
                        <h3>Điều 3: Chính sách bảo mật</h3>
                        Chúng tôi cam kết không truy cập trái phép thông tin trên thiết bị của bạn, toàn bộ thông
                        tin trên website đều do người dùng tự nguyện đăng tải và cung cấp. Toàn bộ dữ liệu được
                        lưu trữ tại hệ thống của GoreVN hoàn toàn không chia sẻ với bên thứ ba.
                        Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên,
                        ban quản trị website sẽ có trách nhiệm thông báo vụ việc cho tất cả thành viên được biết.
                        <h3>Điều 4: Quy định khi tạo bài viết mới, tham gia bình luận </h3>
                        Tất cả các thông tin đăng lên phải tôn trọng các nguyên tắc chung sau:
                        <ul>
                            <li> PHẢI viết đúng văn hóa, chuẩn mực đạo đức. Không sử dụng ngôn ngữ teen.</li>
                            <li>KHÔNG xúc phạm, kích động người khác.</li>
                            <li>KHÔNG chia sẻ sách, tài liệu vi phạm bản quyền.</li>
                            <li>KHÔNG viết về vấn đề chính trị, tôn giáo, phân biệt vùng miền.</li>
                            <li> KHÔNG viết về các nội dung nhạy cảm, vi phạm thuần phong mỹ tục của Việt Nam.</li>
                            <li> KHÔNG viết tục tiểu, đồi trụy, xúc phạm danh dự, phẩm chất, tinh thần đến nhà nước, tôn giáo và thành viên khác.</li>
                        </ul>
                        <h3>Điều 5: Quy định về cách đặt tên tài khoản khi đăng kí thành viên</h3>
                        Chọn tên rõ ràng, có ý nghĩa. Tên có thể là tên thật, biệt danh hoặc một chuỗi kí tự có ý nghĩa không vi phạm các quy tắc bên dưới.
                        Không đặt tên gây nhầm lẫn hoặc phiền toái:
                        <ul>
                            <li> Tên gây nhầm lẫn hoặc cố ý mạo danh thành viên đang sinh hoạt trong diễn đàn.</li>
                            <li>  Tên sử dụng việc giống nhau giữa các kí tự trong cùng một font chữ (ví dụ như “I/l/1”, “O/o/0”…)</li>
                            <li>  Tên có nội dung liên quan hoặc khiến người khác liên tưởng đến tên của các nhà chính trị, nhân vật hay sự kiện quân sự, tôn giáo.</li>
                            <li>  Tên hoặc có ý ám chỉ đến những phần kín hay chức năng sinh sản hoặc bài tiết của cơ thể dưới mọi ngôn ngữ.</li>
                            <li>  Tên gây nhầm lẫn hoặc cố ý mạo danh một tổ chức nào đó ngoài đời thực.</li>
                            <li>  Nghiêm cấm đặt mọi tên có thể khiến người khác hiểu lầm hay liên tưởng tên đó có liên quan đến ban quản trị.</li>
                            <li>   Không đặt tên gây kích động, quấy rối hoặc phỉ báng.</li>
                            <li>   Tên có nội dung xúc phạm, khích bác đến người khác dưới bất kỳ hình thức nào.</li>
                            <li>   Tên có nội dung liên quan đến các sự việc hay nội dung phản động, bài xích tôn giáo, khiêu dâm.</li>
                            <li>   Tên của hình tượng hoặc nhân vật tôn giáo như “Trời”, “Chúa”, “Phật”, “Allah”… có thể xúc phạm đến niềm tin của người khác.</li>
                            <li>  Tên đi ngược lại thuần phong mỹ tục hay truyền thống văn hóa Việt Nam.</li>
                            <li>  Tên dùng cách viết sai chính tả hoặc dùng tên chế xuất phát từ các loại tên bên trên.</li>
                            Khuyến khích tên viết tắt, ngắn ngọn, dễ hiểu.
                        </ul>
                        <h3>Điều 6: Phạm vi sử dụng và bản quyền</h3>
                        Mọi dữ liệu, video, hình ảnh phải được sử dụng bên trong hệ thống diễn đàn GoreVN, GoreVN chỉ có một diễn đàn duy nhất
                        với tên miền gorevn.com, mọi trang web khác đều là giả mạo, nghiêm cấm thành viên copy, sao chép nội dụng của diễn đàn
                        để đăng tải lên nền tảng khác mà chưa có sự đồng ý.
                        <h3> Điều 7: Khiếu nại</h3>
                        Trong trường hợp người dùng phát hiện thông tin cá nhân bị
                        sử dụng sai mục đích hoặc bị xâm phạm thì có thể gửi khiếu nại thông qua email của chúng tôi
                        , chúng tôi sẽ dùng mọi biện pháp cần thiết để ngăn
                        chặng không cho thông tin cá nhân đó bị tiếp tục xâm phạm, đồng thời có các biện pháp hỗ trợ
                        để bảo vệ quyền và lợi ích của người dùng.Người dùng có quyền gửi khiếu nại về việc lộ
                        thông tin cá nhân cho bên thứ 3 đến Ban quản trị của website. Khi tiếp nhận những phản hồi này,
                        chúng tôi sẽ xác nhận lại thông tin, phải có trách nhiệm trả lời lý do và hướng dẫn thành viên
                        khôi phục và bảo mật lại thông tin.
                        

                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <Button style={{ backgroundColor: 'black', color: "white" }} onClick={props.onCloseTermAndService}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default TermAndService

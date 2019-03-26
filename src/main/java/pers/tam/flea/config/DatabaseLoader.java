package pers.tam.flea.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pers.tam.flea.entities.*;
import pers.tam.flea.repositories.CategoryRepository;
import pers.tam.flea.repositories.ItemRepository;
import pers.tam.flea.repositories.RoleRepository;
import pers.tam.flea.repositories.UserRepository;

import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        categoryRepository.saveAll(
                Set.of("手机", "笔记本电脑", "平板", "台式机", "手表", "箱包", "耳机耳麦", "路由器",
                        "网络盒子", "智能手表", "游戏手柄", "无人机", "MP3/MP4", "音响/音箱", "麦克风",
                        "笔记本", "一体机", "组装机", "游戏机", "电脑配件", "打印机", "键盘鼠标", "办公桌",
                        "办公椅", "办公柜", "会议桌", "网卡", "交换机", "显示器", "显卡", "主板", "散热器",
                        "电源", "刻录机/光驱", "声卡/扩展卡", "内存", "硬盘", "U盘", "线缆", "手写板",
                        "摄像头", "鼠标垫", "硬盘盒", "单反相机", "微单相机", "数码相机", "镜头", "运动相机",
                        "拍立得", "影棚器材", "摄像机", "首饰", "配饰", "奢侈品服装", "冰箱", "洗衣机",
                        "平板电视", "空调", "热水壶", "电饭煲", "微波炉", "电烤箱", "热水器", "取暖电器", "吸尘器",
                        "净化器", "加湿器", "冷风扇", "扫地机器人", "电风扇", "挂烫机/熨斗", "净水器", "饮水机",
                        "料理机", "教材", "励志", "小说", "艺术", "文学", "人文社科", "经管", "童书", "钢琴",
                        "吉他", "电子鼓", "效果器", "民族乐器", "西洋管弦", "尤克里里", "机器人")
                        .stream()
                        .map(Category::new)
                        .collect(Collectors.toSet()));

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        "admin",
                        "admin",
                        AuthorityUtils.createAuthorityList("ROLE_ADMIN")));

        User testUser = userRepository.save(new User("test", "{noop}test",
                Set.of(roleRepository.save(new Role(RoleName.ROLE_USER)))));
        User adminUser = userRepository.save(new User("admin", "{noop}admin",
                Set.of(roleRepository.save(new Role(RoleName.ROLE_ADMIN)))));

        Item item1 = new Item();
        item1.setName("Apple iPhone 8 Plus (A1864) 64GB 深空灰色 移动联通电信4G手机");
        item1.setDescription("深空灰色 公开版 内存：64GB差不多一年了吧，打算换华为了，一直有贴膜和保护壳，外观无划痕，原包装也都在");
        item1.setPrice(3500);
        item1.setOriginalPrice(5499);
        item1.setLocation("北京市丰台区");
        item1.setImages(Set.of(new Image("//img10.360buyimg.com/n1/s290x290_jfs/t8107/37/1359438185/72159/a6129e26/59b857f8N977f476c.jpg!cc_1x1")));
        Item item2 = new Item();
        item2.setName("Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机");
        item2.setDescription("深空灰色 公开版 内存：64GB  入手不到1个月，手机我还令购买了2年的意外保险，2年的电池保险，我另行购买的苹果12w快充充电器，一并赠送，还有无线充电器，有发票，官方可查。手机无任何问题，一直戴套贴膜，我全下来花了6600多，想要通话录音功能，换安卓机，想出手！！");
        item2.setPrice(5999);
        item2.setOriginalPrice(6349);
        item2.setLocation("湖南湘潭市岳塘区");
        item2.setImages(Set.of(new Image("//img10.360buyimg.com/n1/s290x290_jfs/t8107/37/1359438185/72159/a6129e26/59b857f8N977f476c.jpg!cc_1x1")));
        testUser.setCollection(Set.of(item1, item2));
        testUser.setItems(Set.of(item1, item2));
        testUser.getItems().forEach(i -> i.setSeller(testUser));
        userRepository.save(testUser);
    }
}
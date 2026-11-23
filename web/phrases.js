/* 词屿 · 短语与固定搭配词表
 *
 * 内置词书只有单词，查「pull out」这类短语时匹配不到东西，所以单独维护一份。
 * 格式（TSV，一行一条，# 开头是注释）：
 *   phrase \t type \t meaning
 * type：pv 短语动词 / col 动词搭配 / prep 介词短语 / adj 形容词搭配 / idm 固定说法
 *
 * 释义按常用义项排列，义项之间用「；」，同一义项内的近义用「，」。
 */
window.PHRASE_DATA = `
# ── 短语动词 ─────────────────────────────────────────────
abide by	pv	遵守，服从（规则、决定）
account for	pv	解释，说明（原因）；占（数量或比例）
add up	pv	加起来；说得通，合乎情理
aim at	pv	瞄准；旨在，针对
allow for	pv	考虑到，把…计算在内
answer for	pv	对…负责，因…受罚
apply for	pv	申请（职位、许可）
apply to	pv	适用于；向…申请
arrive at	pv	到达；达成（结论、决定）
ask for	pv	请求，要求
attend to	pv	处理，照料；注意听
back up	pv	支持，证实；备份（文件）
bail out	pv	帮助摆脱困境；保释；从飞机上跳伞
bear out	pv	证实，证明（说法）正确
bear with	pv	耐心对待，容忍
blow up	pv	爆炸，炸毁；发怒；放大（照片）
break down	pv	出故障，失灵；崩溃；分解；细分
break in	pv	强行进入；打断，插话；磨合
break into	pv	闯入；突然开始（笑、唱）
break off	pv	中断，突然停止；断绝（关系）
break out	pv	爆发，突然发生；逃脱
break through	pv	突破，冲破；取得重大进展
break up	pv	分手，解散；粉碎；放假
bring about	pv	引起，导致
bring back	pv	带回；使回忆起；恢复（制度）
bring down	pv	降低，减少；使垮台，击落
bring forward	pv	提出（建议）；把…提前
bring in	pv	引进，引入；赚得（收入）
bring off	pv	成功完成（困难的事）
bring out	pv	出版，推出；使显现，衬托
bring up	pv	抚养，养育；提出（话题）
brush up on	pv	温习，复习（荒疏的知识）
build up	pv	建立，逐步增强；积累
burn out	pv	耗尽精力，累垮；烧坏
burst out	pv	突然发出（笑、哭、喊）
buy up	pv	大量买进，囤购
call back	pv	回电话；叫回
call for	pv	需要，要求；去接（某人）
call off	pv	取消
call on	pv	拜访；号召，呼吁；请（某人）发言
call up	pv	打电话；征召入伍；使想起
calm down	pv	平静下来，使镇静
carry on	pv	继续；经营，从事
carry out	pv	执行，实施（计划、任务）
carry through	pv	完成，坚持到底；帮助渡过难关
catch on	pv	流行起来；理解，明白
catch up with	pv	赶上，追上；逮捕
check in	pv	办理入住；登记，报到
check out	pv	结账离开；查看，核实
check up on	pv	调查，核查
cheer up	pv	振作起来，使高兴
clear up	pv	澄清，解决；放晴；清理
come about	pv	发生，产生
come across	pv	偶然遇到，碰见；给人…印象
come along	pv	一起来；进展，进行
come apart	pv	破碎，散开；瓦解
come down to	pv	归结为，取决于
come off	pv	成功；脱落；举行
come out	pv	出版，上映；结果是；公开（真相）
come round	pv	苏醒；改变主意；顺道拜访
come through	pv	经历，安然度过；如约提供
come to	pv	达到，总计；苏醒；涉及
come up	pv	出现，发生；被提出；接近
come up with	pv	想出，提出（主意、方案）
count on	pv	依靠，指望
cross out	pv	划掉，删去
cut back	pv	削减，减少（开支）
cut down	pv	砍倒；减少，降低
cut in	pv	插嘴，打断；插队，抢道
cut off	pv	切断，中断；隔绝；剪掉
cut out	pv	删除，删去；停止，戒掉；裁剪
cut up	pv	切碎；使伤心
deal with	pv	处理，应付；涉及，关于
die away	pv	（声音、风）逐渐消失，减弱
die down	pv	逐渐减弱，平息
die out	pv	灭绝，逐渐消失
do away with	pv	废除，取消
do up	pv	系上，扣好；修缮，装饰
do without	pv	没有…也行，将就
draw back	pv	退缩，撤回；拉回
draw on	pv	动用，利用；依靠；临近
draw up	pv	起草，拟定；（车）停下
dress up	pv	盛装，打扮；装饰
drop by	pv	顺道拜访
drop in	pv	偶然拜访，顺便来访
drop off	pv	打盹，睡着；下降，减少；放下（某人）
drop out	pv	退学，退出；掉出
dry up	pv	干涸；枯竭，用完
eat out	pv	外出就餐
end up	pv	最终成为，结果是
even out	pv	使均衡，变得平缓
figure out	pv	弄明白，想出；计算出
fill in	pv	填写；代替（某人）；告知详情
fill out	pv	填写（表格）；变胖
fill up	pv	装满，填满
find out	pv	查明，发现，弄清
fit in	pv	适应，融入；安排时间见（某人）
fix up	pv	安排，解决；修理；装饰
focus on	pv	集中于，专注于
follow through	pv	坚持完成，贯彻到底
follow up	pv	跟进，采取后续行动
freak out	pv	吓坏，使极度不安；发狂
get across	pv	使被理解，把…讲清楚
get along	pv	相处，和睦相处；进展
get around	pv	避开，绕过；传开；四处走动
get at	pv	暗示，意指；够到；着手处理
get away	pv	离开，走开；逃脱；去度假
get back	pv	回来；取回，找回；报复
get by	pv	勉强过活，应付过去
get down to	pv	开始认真做，着手处理
get in	pv	进入；收获；插话；到达
get off	pv	下车；离开；寄出；逃脱惩罚
get on	pv	上车；进展，相处；继续进行
get out	pv	出去；泄露；退出（组织）
get over	pv	克服，战胜；从…中恢复
get rid of	pv	摆脱，除去
get through	pv	通过（考试）；完成；接通电话；度过
get together	pv	聚会，聚集
get up	pv	起床；起身；组织，筹备
give away	pv	赠送；泄露；颁发
give back	pv	归还，退还
give in	pv	屈服，让步；交上
give off	pv	发出（气味、光、热）
give out	pv	分发；用完，耗尽；停止运转
give up	pv	放弃；认输；让出
go about	pv	着手做，开始处理；四处走动
go after	pv	追求，追赶
go ahead	pv	继续，进行；先走
go along with	pv	赞同，支持；陪同
go back on	pv	违背（诺言），背弃
go by	pv	（时间）流逝；遵循，依照；经过
go down	pv	下降，减少；被接受，受欢迎；沉没
go for	pv	选择，争取；适用于；攻击
go in for	pv	爱好，喜欢；从事，参加
go off	pv	爆炸；响起；变质；离开
go on	pv	继续；发生，进行
go out	pv	熄灭；外出；过时；公布
go over	pv	复习，温习；检查，仔细看
go through	pv	经历，遭受；仔细检查；通过
go up	pv	上升，上涨；被建造
go without	pv	没有…也行，将就着过
grow up	pv	长大，成熟；逐渐形成
hand down	pv	传给后代；宣布（判决）
hand in	pv	上交，提交
hand out	pv	分发，散发
hand over	pv	移交，交出
hang on	pv	稍等；坚持；抓住不放；取决于
hang out	pv	闲逛，消磨时间；晾晒
hang up	pv	挂断电话；悬挂
hold back	pv	阻止，抑制；隐瞒；犹豫
hold on	pv	稍等；坚持；抓住
hold out	pv	坚持，抵抗；伸出；维持
hold up	pv	举起；耽搁，延误；抢劫；经得起检验
keep away	pv	远离，不接近
keep down	pv	压制，控制；使不升起
keep off	pv	避开，不接近；防止
keep on	pv	继续，不停
keep up	pv	保持，维持；继续
keep up with	pv	跟上，保持同步；了解（进展）
knock down	pv	撞倒，击倒；拆除；降价
knock out	pv	击倒，打昏；使震惊；淘汰
lay down	pv	放下；规定，制定；放弃
lay off	pv	解雇，裁员；停止
lay out	pv	布置，设计；花（钱）；陈述
leave behind	pv	留下，遗留；把…甩在后面
leave out	pv	遗漏，省略，不包括
let down	pv	使失望；放下，放低；放气
let off	pv	放过，宽恕；开（枪、炮）；引爆
let out	pv	放出，释放；泄露；把（衣服）改大
live on	pv	靠…生活，以…为食
live up to	pv	不辜负，达到（期望）
look after	pv	照顾，照料；负责处理
look around	pv	环顾，四处看看
look back	pv	回顾，回想
look down on	pv	看不起，轻视
look for	pv	寻找；指望，期待
look forward to	pv	期待，盼望
look into	pv	调查，研究
look on	pv	旁观；把…看作
look out	pv	当心，注意；向外看
look over	pv	检查，翻看；原谅
look through	pv	浏览，快速阅读；看穿；透过…看
look up	pv	查阅，查找；好转；抬头看
look up to	pv	尊敬，钦佩
make for	pv	走向，前往；有助于，促成
make out	pv	辨认出，听清；理解；填写；假装
make up	pv	编造；组成；化妆；和好；弥补
make up for	pv	弥补，补偿
mix up	pv	混淆，弄混；弄乱
move on	pv	继续前进；转向新话题
move out	pv	搬出，迁出
pass away	pv	去世；消逝
pass by	pv	经过；忽视，不注意
pass off	pv	冒充；发生，进行
pass on	pv	传递，转交；去世；传染
pass out	pv	昏倒，失去知觉；分发
pass up	pv	放弃，错过（机会）
pay back	pv	偿还；报复
pay for	pv	为…付款；为…付出代价
pay off	pv	还清（债务）；取得成功，有回报
pay out	pv	支付，付出（大笔钱）
pick out	pv	挑选；辨认出；衬托
pick up	pv	捡起；接（人）；学会；好转；加速
point out	pv	指出，指明
pull apart	pv	拆开，撕开；严厉批评
pull down	pv	拆除；使虚弱，使沮丧
pull in	pv	（车）进站，靠边停；吸引（观众）
pull off	pv	成功完成（难事）；（车）驶离道路
pull out	pv	拔出，抽出；撤出，退出；（军队）撤离；（车）驶出
pull over	pv	靠边停车
pull through	pv	恢复健康，渡过难关
pull up	pv	（车）停下；拔起；使靠近
put aside	pv	放到一边；储存，留出；搁置
put away	pv	收好，放回原处；存钱；把…关起来
put down	pv	放下；记下；镇压；贬低
put forward	pv	提出（建议、理论）；把…提前
put off	pv	推迟，拖延；使反感，使分心
put on	pv	穿上，戴上；上演；增加（体重）；假装
put out	pv	熄灭，扑灭；出版；使不便；生产
put through	pv	接通电话；使经历，使遭受
put up	pv	举起；搭建；留宿；提高（价格）
put up with	pv	忍受，容忍
reach out	pv	联系，伸出手；主动帮助
rely on	pv	依靠，依赖；信任
result from	pv	由…造成，起因于
result in	pv	导致，造成
ring up	pv	打电话；把（款额）记入收银机
rule out	pv	排除，不予考虑
run into	pv	偶然遇到；撞上；陷入（困境）
run out	pv	用完，耗尽；到期
run out of	pv	用完，耗尽
run over	pv	（车）碾过；溢出；超过；快速浏览
run through	pv	浏览，匆匆过一遍；贯穿；用完
run up	pv	积欠（债务）；升起；快速缝制
see off	pv	为…送行；赶走
see through	pv	看穿，识破；帮助渡过（难关）
sell out	pv	售完；背叛，出卖
send for	pv	派人去请，派人去取
send off	pv	寄出；为…送行；罚（球员）下场
set about	pv	着手做，开始处理
set aside	pv	留出，拨出；搁置，不顾
set back	pv	推迟，阻碍；使花费
set down	pv	记下，写下；制定（规则）；让…下车
set in	pv	（坏天气、不快）开始并持续
set off	pv	出发，动身；引发，引爆；衬托
set out	pv	出发；着手，开始；陈述，说明
set up	pv	建立，创办；安排；安装；陷害
settle down	pv	定居；安定下来；专心于
settle for	pv	勉强接受，将就
show off	pv	炫耀，卖弄
show up	pv	出现，露面；使显现；使难堪
shut down	pv	关闭，停业；（机器）停止运转
shut up	pv	闭嘴；关好，关起来
sign up	pv	报名，注册；签约雇用
sit back	pv	袖手旁观，放松休息
sit in	pv	旁听，列席；代替（某人）
slow down	pv	减速，放慢
sort out	pv	解决；整理，分类；惩罚
speak out	pv	大胆说出，公开表态
speak up	pv	大声说；发表意见，挺身说话
stand by	pv	支持，站在…一边；待命；坚持（决定）
stand for	pv	代表，象征；主张；容忍
stand out	pv	突出，显眼；坚持
stand up	pv	起立；站得住脚，经得起检验
stand up for	pv	支持，维护
stand up to	pv	抵抗，勇敢面对；经得起
start off	pv	出发；开始（以…方式）
stay up	pv	熬夜，不睡
stick to	pv	坚持，遵守；粘住
stick out	pv	伸出；突出，显眼；坚持到底
take after	pv	（性格、长相）像（长辈）
take apart	pv	拆开，拆卸；严厉批评
take away	pv	拿走，带走；使消失；从…中减去
take back	pv	收回（说过的话）；退回（商品）；使回忆起
take down	pv	记下；拆除；拿下
take in	pv	吸收；理解，领会；欺骗；收留；改小（衣服）
take off	pv	起飞；脱下；休假；迅速流行；模仿
take on	pv	承担；雇用；呈现（面貌）；与…较量
take out	pv	取出，拿出；带…出去；取得（执照）；摧毁
take over	pv	接管，接任；占上风
take to	pv	喜欢；开始从事；逃往
take up	pv	占用（时间、空间）；开始从事；接受（提议）；改短
talk over	pv	商量，讨论
tear down	pv	拆除；拆毁，驳倒
tear up	pv	撕碎；撕毁（协议）
tell apart	pv	区分，分辨
think over	pv	仔细考虑
think up	pv	想出，设计出
throw away	pv	扔掉；浪费，错失
throw up	pv	呕吐；抛起；放弃
try on	pv	试穿，试戴
try out	pv	试用，试验；参加选拔
turn around	pv	好转，扭转；转身
turn away	pv	拒绝（帮助）；转过脸去；打发走
turn down	pv	调低（音量）；拒绝（提议、人）
turn in	pv	上交，提交；上床睡觉；告发
turn off	pv	关掉（电器）；使厌烦；拐弯
turn on	pv	打开（电器）；使兴奋；取决于
turn out	pv	结果是，证明是；出席；生产
turn over	pv	翻转；移交；营业额达；仔细考虑
turn to	pv	求助于，转向；翻到；开始从事
turn up	pv	出现，露面；调高（音量）；被找到
use up	pv	用完，耗尽
wake up	pv	醒来，叫醒；使意识到
warm up	pv	热身，预热；变暖；活跃起来
wash up	pv	洗餐具；洗脸洗手
watch out	pv	当心，留神
wear off	pv	逐渐消失，逐渐减弱
wear out	pv	磨损，穿破；使疲劳
work out	pv	锻炼；解决，算出；想出；结果良好
work up	pv	激发，使激动；逐步建立；精心准备
wrap up	pv	结束，完成；包好；穿暖和
write down	pv	写下，记下
write off	pv	注销，勾销；认为…失败；写信寄出

# ── 动词 + 名词搭配 ──────────────────────────────────────
make a decision	col	作出决定
make a difference	col	有影响，起作用
make a mistake	col	犯错误
make progress	col	取得进步
make an effort	col	努力，尽力
make sense	col	讲得通，有道理
make use of	col	利用
make room for	col	为…让出空间
make friends with	col	与…交朋友
make money	col	赚钱
make ends meet	col	收支相抵，维持生计
make a living	col	谋生
make an appointment	col	预约
make a contribution to	col	对…作出贡献
make a complaint	col	投诉，抱怨
make a difference to	col	对…有影响
make a fortune	col	发财
make a mess	col	弄得一团糟
make an impression on	col	给…留下印象
make allowance for	col	考虑到，体谅
make way for	col	为…让路
take part in	col	参加，参与
take place	col	发生，举行
take care of	col	照顾；处理
take advantage of	col	利用（机会）；占…便宜
take responsibility for	col	对…负责
take into account	col	考虑到，把…考虑在内
take for granted	col	认为理所当然
take measures	col	采取措施
take effect	col	生效，起作用
take turns	col	轮流
take pride in	col	为…感到自豪
take notes	col	做笔记
take action	col	采取行动
take steps	col	采取措施，着手
take a risk	col	冒险
take a break	col	休息一下
take an interest in	col	对…感兴趣
take charge of	col	负责，掌管
take delight in	col	以…为乐
take pains	col	费尽力气，苦心
take the initiative	col	采取主动
have access to	col	有机会接触，可以使用
have an effect on	col	对…有影响
have trouble doing	col	做…有困难
have a say in	col	对…有发言权
have faith in	col	信任，对…有信心
have no choice but to	col	别无选择只能
have a good time	col	玩得开心
have second thoughts	col	改变主意，产生怀疑
do harm to	col	对…有害
do one's best	col	尽力
do research on	col	对…进行研究
do a favor	col	帮个忙
do justice to	col	公平对待；充分展现
do business with	col	与…做生意
pay attention to	col	注意，关注
pay a visit to	col	拜访
pay the price	col	付出代价
pay tribute to	col	称赞，致敬
give rise to	col	引起，导致
give priority to	col	优先考虑
give way to	col	让位于，屈服于
give an example	col	举例
give permission	col	允许，准许
give evidence	col	作证，提供证据
give birth to	col	生下；产生
give credit to	col	称赞；相信
give a hand	col	帮忙
keep in mind	col	记住，考虑到
keep in touch with	col	与…保持联系
keep pace with	col	与…保持同步
keep an eye on	col	照看，留意
keep a record of	col	记录
keep quiet	col	保持安静
keep company with	col	陪伴
keep one's word	col	守信
keep track of	col	记录，掌握…的动态
put emphasis on	col	强调，重视
put pressure on	col	对…施加压力
put an end to	col	结束，终止
put into practice	col	付诸实践
put at risk	col	使…处于危险中
put to use	col	使用，利用
bring benefits to	col	给…带来好处
bring into play	col	发挥，调动
bring to light	col	揭露，使公开
bring to an end	col	结束
come into effect	col	生效
come into contact with	col	与…接触
come to terms with	col	接受，与…妥协
come to a conclusion	col	得出结论
come into being	col	形成，产生
come into use	col	开始使用
carry weight	col	有分量，有影响力
draw a conclusion	col	得出结论
draw attention to	col	引起对…的注意
draw a distinction	col	加以区分
draw a line between	col	在…之间划清界限
bear witness to	col	证明，见证
cast doubt on	col	使人怀疑
raise awareness of	col	提高对…的认识
raise a question	col	提出问题
meet the demand	col	满足需求
meet the deadline	col	按期完成
play a role in	col	在…中起作用
play a part in	col	参与，在…中起作用
play a trick on	col	捉弄
set a precedent	col	开先例
set an example	col	树立榜样
shed light on	col	阐明，使…清楚
strike a balance	col	取得平衡
take a toll on	col	对…造成损害
tell the difference	col	辨别差异
reach an agreement	col	达成协议
seek help	col	寻求帮助
face the music	col	承担后果
follow the rules	col	遵守规则
gain ground	col	取得进展，流行起来
lose ground	col	失去优势，退步
lose track of	col	失去…的线索，记不清
make no difference	col	没有影响，无所谓

# ── 介词短语 ─────────────────────────────────────────────
in terms of	prep	就…而言，从…角度
in spite of	prep	尽管，虽然
in favor of	prep	支持，赞成；有利于
in charge of	prep	负责，掌管
in need of	prep	需要
in case of	prep	如果发生，万一
in the event of	prep	如果发生，万一
in the face of	prep	面对，尽管有
in light of	prep	鉴于，根据
in line with	prep	与…一致，符合
in contrast to	prep	与…形成对比
in addition to	prep	除…之外（还）
in response to	prep	作为对…的回应
in accordance with	prep	按照，依照
in respect of	prep	关于，就…而言
in relation to	prep	关于，与…相比
in return for	prep	作为…的回报
in place of	prep	代替
in exchange for	prep	交换，以换取
in proportion to	prep	与…成比例
in comparison with	prep	与…相比
in view of	prep	鉴于，考虑到
in the absence of	prep	在没有…的情况下
in the wake of	prep	随…之后，作为…的结果
in the course of	prep	在…过程中
in the long run	prep	从长远看
in the meantime	prep	与此同时
in the end	prep	最后，终于
in advance	prep	提前，预先
in particular	prep	尤其，特别是
in general	prep	总的来说，一般地
in short	prep	简而言之
in brief	prep	简要地说
in detail	prep	详细地
in full	prep	全部，全额
in person	prep	亲自，本人
in public	prep	公开地，当众
in private	prep	私下，秘密地
in secret	prep	秘密地
in common	prep	共同的，共有的
in doubt	prep	不确定，有疑问
in trouble	prep	处于困境
in danger	prep	处于危险中
in order	prep	整齐；按顺序；妥当
in vain	prep	徒劳，白费
in effect	prep	实际上；生效
in practice	prep	实际上；在实践中
in principle	prep	原则上
in reality	prep	实际上
in time	prep	及时；最终
on time	prep	准时
on purpose	prep	故意地
on average	prep	平均而言
on the whole	prep	总体上
on the contrary	prep	相反
on the basis of	prep	根据，在…基础上
on behalf of	prep	代表，为了
on account of	prep	由于，因为
on the spot	prep	当场，立即
on the verge of	prep	濒临，即将
on the grounds of	prep	以…为理由
on the rise	prep	在上升，在增长
on the decline	prep	在下降，在衰退
on sale	prep	出售；打折
on vacation	prep	度假
on trial	prep	受审；试用中
on foot	prep	步行
on board	prep	在船上，在车上
on duty	prep	值班
on strike	prep	罢工
on call	prep	随叫随到
at the expense of	prep	以…为代价
at the mercy of	prep	任凭…摆布
at the risk of	prep	冒…的风险
at the cost of	prep	以…为代价
at the age of	prep	在…岁时
at the moment	prep	此刻，目前
at the same time	prep	同时；然而
at first	prep	起初
at last	prep	最后，终于
at least	prep	至少
at most	prep	最多
at all	prep	根本（用于否定、疑问）
at once	prep	立刻；同时
at present	prep	目前
at heart	prep	内心里，本质上
at best	prep	充其量
at worst	prep	最坏的情况下
at random	prep	随机地
at stake	prep	处于危险中，利害攸关
at large	prep	整体上；逍遥法外
at ease	prep	放松，自在
at length	prep	最终；详细地
at any rate	prep	无论如何
by means of	prep	通过，借助
by virtue of	prep	凭借，由于
by no means	prep	绝不
by all means	prep	当然可以；务必
by accident	prep	偶然，意外地
by chance	prep	偶然，碰巧
by mistake	prep	错误地
by hand	prep	用手工
by heart	prep	凭记忆
by far	prep	（比较级、最高级前）远远，显然
by degrees	prep	逐渐地
by contrast	prep	相比之下
by the way	prep	顺便说一下
for the sake of	prep	为了，为了…的利益
for the purpose of	prep	为了…目的
for good	prep	永远，一劳永逸地
for now	prep	暂时
for once	prep	就这一次
for instance	prep	例如
for the time being	prep	暂时，目前
with regard to	prep	关于，至于
with respect to	prep	关于；就…而言
with the exception of	prep	除…之外
with a view to	prep	为了，以…为目的
as a result of	prep	由于，作为…的结果
as a matter of fact	prep	事实上
as a whole	prep	总体上，作为一个整体
as for	prep	至于，就…而言
as to	prep	关于，至于
apart from	prep	除…之外；除了…还有
regardless of	prep	不管，不顾
thanks to	prep	多亏，由于
due to	prep	由于，因为
owing to	prep	由于
prior to	prep	在…之前
according to	prep	根据，按照
instead of	prep	代替，而不是
rather than	prep	而不是
as well as	prep	以及，和…一样
out of date	prep	过时的
out of order	prep	出故障；次序颠倒
out of place	prep	不合适，不相称
out of reach	prep	够不到，无法达到
out of work	prep	失业
out of control	prep	失控
out of the question	prep	不可能，办不到
out of touch with	prep	与…失去联系，不了解
out of breath	prep	上气不接下气
out of stock	prep	缺货
up to date	prep	最新的，时新的
up to	prep	多达；由…决定；胜任
ahead of	prep	在…之前，领先于
in front of	prep	在…前面
on top of	prep	在…之上；除…之外
next to	prep	紧挨着；仅次于
along with	prep	连同，与…一起
together with	prep	连同，和…一起
in exchange	prep	作为交换
in bulk	prep	大批量地
in sequence	prep	依次，按顺序
in turn	prep	依次；反过来
in a row	prep	连续地
in a sense	prep	在某种意义上
in any case	prep	无论如何
in no case	prep	决不
in this regard	prep	在这方面
in the middle of	prep	在…中间，正在…时

# ── 形容词搭配 ───────────────────────────────────────────
be aware of	adj	意识到，知道
be capable of	adj	有能力做，能够
be fond of	adj	喜欢
be afraid of	adj	害怕，担心
be short of	adj	缺少，不足
be free of	adj	没有…的，免于
be typical of	adj	是…的典型
be conscious of	adj	意识到，察觉到
be guilty of	adj	犯有…罪，有…的过失
be jealous of	adj	嫉妒
be proud of	adj	为…自豪
be ashamed of	adj	为…感到羞愧
be tired of	adj	厌倦
be worthy of	adj	值得
be devoid of	adj	缺乏，没有
be characteristic of	adj	是…的特点
be curious about	adj	对…好奇
be anxious about	adj	为…担忧
be concerned about	adj	担心，关心
be enthusiastic about	adj	对…热情
be serious about	adj	对…认真
be particular about	adj	对…挑剔，讲究
be optimistic about	adj	对…乐观
be responsible for	adj	对…负责
be famous for	adj	以…闻名
be suitable for	adj	适合
be ready for	adj	为…做好准备
be eligible for	adj	有资格获得
be grateful for	adj	感激
be known for	adj	因…而闻名
be known as	adj	被称为，作为…而闻名
be based on	adj	基于，以…为基础
be dependent on	adj	依赖，取决于
be keen on	adj	热衷于
be intent on	adj	决心做，专注于
be subject to	adj	受…影响，服从；易受
be exposed to	adj	暴露于，接触到
be opposed to	adj	反对
be accustomed to	adj	习惯于
be addicted to	adj	沉迷于
be committed to	adj	致力于，承诺
be devoted to	adj	献身于，专注于
be equivalent to	adj	等同于，相当于
be similar to	adj	与…相似
be superior to	adj	优于，高于
be inferior to	adj	劣于，低于
be relevant to	adj	与…相关
be sensitive to	adj	对…敏感
be vulnerable to	adj	易受…伤害
be consistent with	adj	与…一致
be satisfied with	adj	对…满意
be familiar with	adj	熟悉
be associated with	adj	与…有关联
be compared with	adj	与…相比
be involved in	adj	参与，涉及
be engaged in	adj	从事，忙于
be interested in	adj	对…感兴趣
be rich in	adj	富含
be absorbed in	adj	专心于
be caught up in	adj	卷入，陷入
be bound to	adj	一定会，必然
be likely to	adj	可能
be willing to	adj	愿意
be able to	adj	能够
be supposed to	adj	应该，按理说
be about to	adj	即将
be due to	adj	预期于；由于
be obliged to	adj	不得不，感激
be entitled to	adj	有权获得
be prone to	adj	易于，有…倾向
be reluctant to	adj	不愿
be inclined to	adj	倾向于
be opposed to doing	adj	反对做…
be used to	adj	习惯于
be equal to	adj	等于；胜任
be open to	adj	对…开放，愿意接受
be loyal to	adj	忠于
be identical to	adj	与…完全相同
be parallel to	adj	与…平行；类似于
be proportional to	adj	与…成正比
be vital to	adj	对…至关重要
be essential to	adj	对…必不可少
be beneficial to	adj	对…有益
be harmful to	adj	对…有害
be indifferent to	adj	对…漠不关心
be generous with	adj	在…上大方
be strict with	adj	对…严格
be angry with	adj	对（某人）生气
be busy with	adj	忙于
be content with	adj	对…满足
be confronted with	adj	面临，面对
be faced with	adj	面临
be equipped with	adj	配备有
be crowded with	adj	挤满
be filled with	adj	充满
`;

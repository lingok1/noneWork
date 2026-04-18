import customtkinter as ctk
import tkinter.messagebox as messagebox

# 设置现代简约的主题风格
ctk.set_appearance_mode("dark")  # 默认深色模式，符合年轻人沉浸式偏好
ctk.set_default_color_theme("blue")  # 主题色

class CiLeMeApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        # 模拟小程序竖屏比例
        self.title("辞了么")
        self.geometry("380x650")
        self.resizable(False, False)

        # 进度状态与触发标记（确保每个提示只跳出一次）
        self.progress_value = 0.0
        self.triggered_events = {
            30: False,
            50: False,
            80: False,
            90: False,
            100: False
        }

        self.setup_ui()

    def setup_ui(self):
        # 顶部标题区
        self.title_label = ctk.CTkLabel(
            self, 
            text="辞 了 么", 
            font=("Microsoft YaHei", 32, "bold"),
            text_color="#1E90FF"
        )
        self.title_label.pack(pady=(60, 20))

        self.subtitle_label = ctk.CTkLabel(
            self, 
            text="你的专属职场焦虑粉碎机", 
            font=("Microsoft YaHei", 14),
            text_color="gray"
        )
        self.subtitle_label.pack(pady=(0, 50))

        # 中上部：进度条
        self.progress_bar = ctk.CTkProgressBar(
            self, 
            width=280, 
            height=20, 
            corner_radius=10,
            progress_color="#00FA9A" # 初始用治愈的绿色
        )
        self.progress_bar.set(0)
        self.progress_bar.pack(pady=20)

        # 进度百分比显示
        self.percent_label = ctk.CTkLabel(
            self, 
            text="当前离职冲动：0%", 
            font=("Microsoft YaHei", 16, "bold")
        )
        self.percent_label.pack(pady=10)

        # 提示文案展示区
        self.message_label = ctk.CTkLabel(
            self, 
            text="深呼吸，想发泄就点下面的按钮...", 
            font=("Microsoft YaHei", 14),
            text_color="#FFD700",
            wraplength=300
        )
        self.message_label.pack(pady=30)

        # 中下部：交互按钮
        self.click_button = ctk.CTkButton(
            self, 
            text="释放焦虑 👊", 
            font=("Microsoft YaHei", 18, "bold"),
            width=200,
            height=60,
            corner_radius=30,
            hover_color="#FF6347", # 悬停时变色，增加交互感
            command=self.on_click
        )
        self.click_button.pack(side="bottom", pady=80)

    def on_click(self):
        # 每次点击增加 5% 进度，可以根据需要调整快慢
        if self.progress_value < 1.0:
            self.progress_value += 0.05
            
        # 防止浮点数精度问题导致溢出
        current_percent = min(int(round(self.progress_value * 100)), 100)
        
        # 更新UI进度
        self.progress_bar.set(self.progress_value)
        self.percent_label.configure(text=f"当前离职冲动：{current_percent}%")

        # 随着进度加深，进度条变红，暗示情绪激烈
        if current_percent >= 50:
            self.progress_bar.configure(progress_color="#FF4500")

        # 触发节点逻辑
        self.check_milestones(current_percent)

    def check_milestones(self, percent):
        if percent >= 30 and not self.triggered_events[30]:
            self.trigger_event(30, "有点焦虑哦，你该试试我们的游戏 🎮")
            
        elif percent >= 50 and not self.triggered_events[50]:
            self.trigger_event(50, "来线下吧，需要找个搭子聊一聊嘛 ☕")
            
        elif percent >= 80 and not self.triggered_events[80]:
            self.trigger_event(80, "太暴躁了，想找律师聊一聊嘛 ⚖️")
            
        elif percent >= 90 and not self.triggered_events[90]:
            self.trigger_event(90, "小辞为你争取最佳离职权益，来了解一下法条 📜")
            
        elif percent >= 100 and not self.triggered_events[100]:
            self.trigger_event(100, "辞了！🎉", final=True)

    def trigger_event(self, threshold, message, final=False):
        self.triggered_events[threshold] = True
        self.message_label.configure(text=message)
        
        # 弹窗提示，增强“跳出”感
        messagebox.showinfo("提示", message)

        if final:
            # 达到100%时，改变按钮状态
            self.click_button.configure(
                text="恭喜你，重获自由！", 
                state="disabled",
                fg_color="#32CD32"
            )
            self.progress_bar.configure(progress_color="#32CD32")

if __name__ == "__main__":
    app = CiLeMeApp()
    app.mainloop()
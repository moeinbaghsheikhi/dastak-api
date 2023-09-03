// تابع ResponseFormat برای ایجاد یک ساختار استاندارد پاسخ
let ResponseFormat = (ok: boolean, status: number, message: string, token: string | null, data: any) => {
    return {
        ok,
        status,
        message,
        token,
        data
    };
}

// نوع داده‌ای ResponseFormatType برای تعریف ساختار پاسخ استفاده شده در توابع
export type ResponseFormatType = {
    ok: boolean, // وضعیت موفقیت عملیات
    status: number, // کد وضعیت HTTP
    message: string, // پیام مرتبط با پاسخ
    token: string | null, // توکن امنیتی
    data: any // داده‌های پاسخ
}

// صادر کردن تابع ResponseFormat به عنوان ماژول پیش‌فرض
export default ResponseFormat;
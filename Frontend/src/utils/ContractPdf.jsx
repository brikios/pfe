import React from 'react'
import { Page, Document, Font, Text, View, StyleSheet } from 'react-pdf';

const ContractPdf = ({ownerName,clientName,adress,startDate,endDate,price}) => {
    Font.register({ family: 'Roboto', src: '/path/to/Roboto-Regular.ttf' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  content: {
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: 1.5,
  },
});
  return (
    <Document > 
        <Page size="A4" style={styles.page}>
        <View style={styles.content}>
        عقد إيجار للعقارات بين السيد/ السيدة {ownerName}، والمعروف فيما يلي بـ "المالك"، والسيد/ السيدة {clientName}،والمعروف فيما يلي بـ "العميل"،

    تمت الموافقة على ما يلي:
    
    المادة 1: الموضوع يتم تأجير العقار التالي:
    
    عنوان العقار: {adress}
    
    المادة 2: فترة الإيجار يبدأ هذا العقد في تاريخ {startDate} ويستمر حتى تاريخ {endDate}.
    
    المادة 3: الإيجار يتعهد العميل بدفع مبلغ إيجار قدره {price} دت
    
    المادة 4: الضمان المالي يتعهد العميل بدفع مبلغ متفق عليه كضمان مالي يتم استرداده عند انتهاء العقد وبعد التأكد من حالة العقار.
    
    المادة 5: الاستخدام يجب على العميل استخدام العقار للأغراض السكنية فقط وعدم استخدامه لأي غرض تجاري أو غير قانوني.
    
    المادة 6: التوقيع توقع الأطراف هذا العقد في تاريخ  ...................... 
    
    المالك: العميل:  
    </View>
    </Page>
    </Document>
  )
}

export default ContractPdf
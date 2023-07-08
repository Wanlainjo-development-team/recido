import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../../../components/Header'
import styles from './styles'

const aboutTexts = [
  'Welcome to Recido, the ultimate business app designed to streamline your invoicing process and keep your business operations organized. With Recido, business owners can effortlessly create and send professional invoices to customers through various channels, including social sharing, email, and printing.',
  'Say goodbye to the hassle of manual invoicing and hello to the convenience of Recido. Our user-friendly interface empowers you to generate customized invoices quickly and easily. Personalize each invoice with your business logo, contact information, and terms of payment, ensuring a consistent and professional image for your brand.',
  `Recido doesn't stop at invoicing. Our app also serves as a comprehensive customer and inventory management system. Keep track of all your valued customers, their contact details, and purchase history. Easily retrieve customer information whenever you need it, ensuring a personalized and efficient experience.`,
  `Manage your inventory effortlessly with Recido. Keep a detailed record of your products, including descriptions, prices, and stock levels. Monitor your inventory in real-time and receive alerts when stock levels are low, enabling you to restock and fulfill orders seamlessly.`,
  `With Recido, you're always in control. Gain valuable insights into your business performance through detailed sales reports and analytics. Track your revenue, monitor outstanding payments, and make informed decisions to drive growth and profitability.`,
  `Experience the power of Recido and take your business to new heights. Simplify your invoicing, enhance customer relationships, and optimize inventory management—all within a single, intuitive app. Join thousands of satisfied business owners who have embraced Recido and witnessed the transformation it brings to their day-to-day operations.`
]

const About = () => {
  return (
    <View style={{ ...styles.conttainer, paddingHorizontal: 0 }}>
      <Header title='About recido' />

      <ScrollView showsVerticalScrollIndicator={false} style={{ ...styles.conttainer, paddingTop: 10 }}>
        {
          aboutTexts.map((item, index) => <Text key={index} style={styles.texts}>{item}</Text>)
        }
      </ScrollView>
    </View>
  )
}

export default About
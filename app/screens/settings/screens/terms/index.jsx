import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../../../components/Header'
import styles from './styles'

const aboutTexts = [
  {
    title: 'Applicability',
    texts: [
      'These Terms of Use apply to all users of the App, including business owners, employees, and customers.'
    ]
  },
  {
    title: 'Use of the App',
    texts: [
      'You must be at least 18 years old or have the necessary legal capacity to use the App.',
      `You agree to use the App solely for lawful purposes and in compliance with all applicable laws and regulations.`,
      `You are responsible for maintaining the confidentiality of any account credentials used to access the App. You agree to notify us immediately of any unauthorized access to your account.`,
      `You understand and agree that the App is provided on an "as is" and "as available" basis. We do not warrant that the App will be uninterrupted, error-free, or free of viruses or other harmful components.`
    ]
  },
  {
    title: 'Invoicing and Payment',
    texts: [
      `The App allows you to create and send invoices to your customers. You are solely responsible for the accuracy and content of the invoices generated through the App.`,
      `Any payments or transactions between you and your customers are outside the scope of the App. We do not process or facilitate payments and are not responsible for any payment-related issues or disputes.`
    ]
  },
  {
    title: 'Customer and Inventory Management',
    texts: [
      `The App provides customer and inventory management features, allowing you to keep track of your customers and inventory levels.`,
      `You are responsible for maintaining the accuracy and completeness of customer and inventory data entered into the App.`,
      `We do not guarantee the availability, accuracy, or reliability of customer and inventory management features and shall not be liable for any errors, omissions, or losses arising from their use.`
    ]
  },
  {
    title: 'Intellectual Property',
    texts: [
      `All intellectual property rights in the App, including but not limited to trademarks, logos, and content, are owned by us or our licensors. You may not use, reproduce, modify, or distribute any of our intellectual property without our prior written consent.`,
      `By using the App, you grant us a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, and distribute any content or information you provide through the App for the purpose of operating and improving the App.`
    ]
  },
  {
    title: 'Privacy',
    texts: [
      `Our collection, use, and disclosure of your personal information are governed by our Privacy Policy, which forms an integral part of these Terms of Use.`,
      `By using the App, you consent to the collection, use, and disclosure of your personal information as described in our Privacy Policy.`
    ]
  },
  {
    title: 'Termination',
    texts: [
      `We reserve the right to suspend or terminate your access to the App at any time without prior notice or liability for any reason, including but not limited to a violation of these Terms of Use.`
    ]
  },
  {
    title: 'Modifications',
    texts: [
      `We may revise these Terms of Use at any time without prior notice by updating this page. By continuing to use the App after any changes, you agree to be bound by the revised terms.`
    ]
  },
  {
    title: 'Governing Law',
    texts: [
      `These Terms of Use are governed by and construed in accordance with the laws of [Jurisdiction]. Any dispute arising out of or in connection with these Terms of Use shall be submitted to the exclusive jurisdiction of the courts of [Jurisdiction].`
    ]
  },
  {
    title: 'Contact Us',
    texts: [
      `If you have any questions or concerns about these Terms of Use, please contact us at [email address].`
    ]
  },
]

const TermsOfUse = () => {
  return (
    <View style={{ ...styles.conttainer, paddingHorizontal: 0 }}>
      <Header title='Terms of use' />

      <ScrollView showsVerticalScrollIndicator={false} style={{ ...styles.conttainer, paddingTop: 10 }}>
        {
          aboutTexts.map((item, index) => <View key={index} style={styles.textView}>
            <Text style={styles.title}>{item.title}</Text>

            {
              item.texts.map((text, id) => <Text key={id} style={styles.texts}>{text}</Text>)
            }
          </View>)
        }
      </ScrollView>
    </View>
  )
}

export default TermsOfUse
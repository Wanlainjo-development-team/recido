import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../../../components/Header'
import styles from './styles'
import color from '../../../../style/color'

const aboutTexts = [
  {
    title: `Information We Collect`,
    subTitle: `We may collect personal identification information from Users in various ways, including when Users use the App, register on the App, subscribe to our newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features, or resources we make available in the App. Users may be asked for, as appropriate, name, email address, phone number, and other relevant information.`,
    list: []
  },
  {
    title: `How We Use Collected Information`,
    subTitle: `We may collect and use Users' personal information for the following purposes:`,
    list: [
      `To personalize the user experience: We may use the information to understand how our Users as a group use the services and resources provided on our App.`,
      `To improve our App: We continually strive to improve our App offerings based on the information and feedback we receive from Users.`,
      `To send periodic emails: We may use the email address to send User information and updates pertaining to their orders, inquiries, or other requests. It may also be used to respond to their inquiries, questions, and/or other requests.`
    ]
  },
  {
    title: `How We Protect Your Information`,
    subTitle: `We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our App.`,
    list: []
  },
  {
    title: `Sharing Your Personal Information`,
    subTitle: `We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.`,
    list: []
  },
  {
    title: `Changes to This Privacy Policy`,
    subTitle: `We have the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.`,
    list: []
  },
  {
    title: `Your Acceptance of These Terms`,
    subTitle: `By using this App, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our App. Your continued use of the App following the posting of changes to this policy will be deemed your acceptance of those changes.`,
    list: []
  },
  {
    title: `Contacting Us`,
    subTitle: `If you have any questions about this Privacy Policy, the practices of this App, or your dealings with this App, please contact us at [email address].`,
    list: []
  },
]

const PrivacyPolicy = () => {
  return (
    <View style={{ ...styles.conttainer, paddingHorizontal: 0 }}>
      <Header title='Privacy policy' />

      <ScrollView showsVerticalScrollIndicator={false} style={{ ...styles.conttainer, paddingTop: 10 }}>
        {
          aboutTexts.map((item, index) => <View key={index} style={styles.textView}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.subTitle}</Text>

            {
              item.list.length >= 1 &&
              <>
                {
                  item.list.map((text, id) => <View key={id} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ width: 5, height: 5, borderRadius: 100, backgroundColor: color.black, marginRight: 10 }} />
                    <Text style={styles.texts}>{text}</Text>
                  </View>)
                }
              </>
            }
          </View>)
        }
      </ScrollView>
    </View>
  )
}

export default PrivacyPolicy
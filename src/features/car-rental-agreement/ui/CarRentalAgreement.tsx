import {FC} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native"
import {Button} from "src/shared/components/Button";
import {colors, fonts} from "src/shared/style";

// import { colors, fonts } from "src/shared/styles";

interface IPrivacyPolicy {
  type?: 'confirm' | 'read';
  onConfirm?: () => void;
  onBack: () => void;
}

export const CarRentalAgreement: FC<IPrivacyPolicy> = ({
                                                         type = 'read',
                                                         onConfirm,
                                                         onBack
                                                       }) => {
  return (
    <SafeAreaView style={styles.layout}>
      <Text style={[fonts.bold, styles.title]}>Договор аренды авто с экипажем</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[fonts.light, styles.description]}>
          {`
1. Общие положения
1.1. Данный документ, адресованный любому физическому лицу, является официальным предложением «ЮГ-Трансфер» и содержит все существенные условия работы сервиса «Аренда транспортного средства с экипажем» (далее - Сервис).
1.2. В соответствии со статьей 437 Гражданского кодекса Российской Федерации данный документ является публичной офертой. Начало использования Сервиса в любом виде является ее акцептом, что считается равносильным заключению договора на изложенных в оферте условиях. Оферта размещена на сайте «ЮГ-Трансфер» в сети Интернет по адресу https://ug-transfer.online/ 
1.3. Используя Сервис, Арендатор соглашается также с Политикой «ЮГ-Трансфер» в отношении обработки конфиденциальных данных, размещенной в сети Интернет по адресу https://ug-transfer.online/
1.4. Арендатор должен внимательно ознакомиться с текстом оферты. В случае если Арендатор не согласен с какими-либо ее условиями, ему предлагается отказаться от использования Сервиса. В случае возникновения у Арендатора вопросов, касающихся использования Сервиса, ему необходимо обратиться за консультацией к специалисту «ЮГ-Трансфер» перед размещением заказа.
1.5. Определения, используемые в целях выполнения условий настоящей оферты:
1.5.1. Сервис — Предоставляемый «ЮГ-Трансфер» сервис «Аренда транспортного средства с экипажем», позволяющий Арендатору заключать с Арендодателями договоры аренды транспортного средства с экипажем.
1.5.2. Арендатор — лицо, размещающее посредством Сервиса заказ на заключение договора аренды транспортного средства с экипажем.
1.5.3. Арендодатель — собственник либо иной владелец транспортного средства, предоставляющий Арендатору это транспортное средство во временное и пользование, а также оказывающий Арендатору услуги по управлению таким транспортным средством.
1.5.4. Заказ — размещенная в Сервисе заявка Арендатора на заключение договора аренды транспортного средства с экипажем.
1.5.5. Личный кабинет — страница на сайте «ЮГ-Трансфер», содержащая статистическую информацию об использовании Сервиса и текущем состоянии лицевого счета Арендатора. Для регистрации личного кабинета необходимо предоставление как минимум данных об абонентском телефонном номере Арендатора.
1.5.6. Лицевой счет — счет, на котором фиксируются авансовые платежи Арендатора и суммы денежных средств, удержанные (списанные) из данных платежей в качестве платы за предоставление транспортного средства в аренду. Лицевой счет имеет уникальный номер и формируется «ЮГ-Трансфер».
1.5.7. Баланс лицевого счета — разность на определенный момент времени между суммами денежных средств, внесенных на лицевой счет и списанных с лицевого счета.
1.5.8. Предварительный заказ — заказ, принимаемый не менее чем за 60 минут, предполагающий возможность предоставления транспортного средства в аренду в момент времени, указанный Арендатором.
1.5.9. Текущий заказ — заказ, предполагающий предоставление транспортного средства «как можно быстрее».
1.5.10. Авторизованное мобильное приложение (Мобильное приложение) — программа для электронных вычислительных машин ЮГ-Трансфер, устанавливаемая на мобильное устройство Арендатора и позволяющая автоматизировать процесс формирования Заказов посредством сети Интернет.
2. Предмет оферты
2.1. Посредством Сервиса Арендатор может безвозмездно разместить заявку на заключение договора аренды транспортного средства с экипажем. «ЮГ-Трансфер» самостоятельно не предоставляет Арендатору транспортные средства и не оказывает какие-либо транспортные услуги, не принимает на себя права и (или) обязанности арендодателя или исполнителя в отношении таких услуг.
2.2. Акцептом настоящей оферты является начало использования Арендатором Сервиса в целях заключения договора аренды транспортного средства с экипажем.
2.3 Арендатор несет ответственность за содержание и достоверность информации, предоставленной при размещении Заказа.
                  `}
        </Text>
      </ScrollView>
      <View style={styles.buttons_holder}>
        <Button projectType="secondary" onPress={onBack}>
          <Text style={[fonts.regular, styles.secondary_button_text]}>Назад</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 40
  },
  content: {
    paddingHorizontal: 20,
    flexGrow: 1
  },
  title: {
    fontSize: 16,
    color: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  description: {
    fontSize: 16,
    color: colors.white,
    lineHeight: 22
  },
  buttons_holder: {
    flexDirection: 'column',
    rowGap: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.line
  },
  secondary_button_text: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.white
  },
  primary_button_text: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.black
  }
});
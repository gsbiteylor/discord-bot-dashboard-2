import { Flex, Grid, Spacer, Text, VStack } from '@chakra-ui/layout';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Image,
  useColorMode,
} from '@chakra-ui/react';
import { avatarUrl, bannerUrl } from 'api/discord';
import { SelectField } from 'components/forms/SelectField';
import { SwitchField } from 'components/forms/SwitchField';
import { languages, names } from 'config/translations';
import { profile } from 'config/translations/profile';
import { IoLogOut } from 'react-icons/io5';
import { useLogoutMutation, useSettingsStore, useSelfUser } from 'stores';
import { useColors } from 'theme';

/**
 * User info and general settings here
 */
export function ProfileView() {
  const user = useSelfUser();
  const logout = useLogoutMutation();
  const t = profile.useTranslations();

  const { cardBg } = useColors();
  const { colorMode, setColorMode } = useColorMode();
  const [devMode, setDevMode, lang, setLang] = useSettingsStore((s) => [
    s.devMode,
    s.setDevMode,
    s.lang,
    s.setLang,
  ]);

  return (
    <Grid templateColumns={{ base: '1fr', md: 'minmax(0, 800px) auto' }} gap={3}>
      <Flex direction="column" maxW="800px" p={2} pl={0}>
        <Image src={bannerUrl(user)} rounded="2xl" />
        <VStack mt="-50px" ml="40px" align="start">
          <Avatar
            src={avatarUrl(user)}
            name={user.username}
            w="100px"
            h="100px"
            ringColor={cardBg}
            ring="6px"
          />
          <Text fontWeight="600" fontSize="2xl">
            {user.username}
          </Text>
        </VStack>
      </Flex>
      <Card w="full" rounded="3xl" h="fit-content">
        <CardHeader fontSize="2xl">{t.settings}</CardHeader>
        <CardBody as={Flex} direction="column" gap={3} mt={3}>
          <SwitchField
            id="dark-mode"
            label={t['dark mode']}
            desc={t['dark mode description']}
            isChecked={colorMode === 'dark'}
            onChange={(e) => setColorMode(e.target.checked ? 'dark' : 'light')}
          />
          <SwitchField
            id="developer-mode"
            label={t['dev mode']}
            desc={t['dev mode description']}
            isChecked={devMode}
            onChange={(e) => setDevMode(e.target.checked)}
          />
          <FormControl>
            <FormLabel flexDirection="column" fontSize="md">
              <Text fontWeight="600">{t.language}</Text>
              <Text color="secondaryGray.600">{t['language description']}</Text>
            </FormLabel>
            <SelectField
              value={{
                label: names[lang],
                value: lang,
              }}
              onChange={(e) => setLang(e.value)}
              options={languages.map((lang) => ({
                label: lang.name,
                value: lang.key,
              }))}
            />
          </FormControl>
          <Spacer mt="100px" />
          <Button
            leftIcon={<IoLogOut />}
            variant="danger"
            isLoading={logout.isLoading}
            onClick={() => logout.mutate()}
          >
            {t.logout}
          </Button>
        </CardBody>
      </Card>
      <Content />
    </Grid>
  );
}

function Content() {
  return <></>;
}

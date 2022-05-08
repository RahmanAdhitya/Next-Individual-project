import { Icon, Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiPlus, BiMinus, BiHeart, BiCopy } from 'react-icons/bi';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import ContentCard from '../../component/ContentCard';
import axios from 'axios';
import Page from '../../component/page';
import { useEffect } from 'react';
import { WEB_URL } from '../../configs/url';

const postDetail = ({ post }) => {
  const router = useRouter();

  const copyLinkBtnHandler = () => {
    // navigator.clipboard.writeText(
    //   `https://grumpy-dolphin-14.loca.lt${router.asPath}`
    // );
    // toast({
    //   position: "top-right",
    //   status: "info",
    //   title: "Link copied",
    // });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const shareToggle = () => {
    return (
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share This Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack mt={2} direction="row">
              <FacebookShareButton url={`${WEB_URL}${router.asPath}`} quote={`Cek ${post.caption} sekarang juga! By ${post.username}`}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <TwitterShareButton title={`Cek ${post.caption} sekarang juga!`} url={`${WEB_URL}${router.asPath}`}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              <LinkedinShareButton url={`${WEB_URL}${router.asPath}`} title={`Cek ${post.caption} sekarang juga! By ${post.username}`} summary={post.caption}>
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
              <IconButton onClick={copyLinkBtnHandler} borderRadius="50%" icon={<Icon as={BiCopy} />} />
            </Stack>
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3}>
              Save
            </Button> */}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  useEffect(() => {
    if (router.isReady) {
      onOpen();
    }
  }, [router.isReady]);
  return (
    <Page
      title={`${post.User.username} || ${post.caption}`}
      description={post.caption}
      image={post.image_url}
      url={`${WEB_URL}${router.asPath}`}
      //
    >
      <Box>
        {shareToggle()}
        <ContentCard
          caption={post.caption}
          profilPic={post.User.image_url}
          username={post.User.username}
          location={post.location}
          likes={post.like_count}
          image={post.image_url}
          id={post.id}
          comment={post.Comments}
          userId={post.UserId}
          //
        />
      </Box>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { auth_token } = context.req.cookies;

  try {
    // this function call axios not axiosinstace because there no token in server
    const res = await axios.get(`http://localhost:2060/posts/${id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    const post = res.data.result;

    return { props: { post } };
  } catch (err) {
    return {
      props: {},
    };
  }
}
export default postDetail;

import 'package:demo_app/App/HomeScreen/HomeScreenController.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:video_player/video_player.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    HomeScreenController controller = Get.put(HomeScreenController());

    return Scaffold(
      appBar: AppBar(title: Text('TikTok-like Video App')),
      body: Obx(() => PageView.builder(
        scrollDirection: Axis.vertical,
        itemCount: controller.videoControllers.length,
        onPageChanged: (index) {
          controller.playVideoAtIndex(index);
        },
        itemBuilder: (context, index) {
          final videoController = controller.videoControllers[index];
          return VideoPlayerWidget(
            videoController: videoController,
            onTap: () => controller.togglePlayPause(index),
            isPaused: !videoController.value.isPlaying,
          );
        },
      )),
    );
  }
}

class VideoPlayerWidget extends StatelessWidget {
  final VideoPlayerController videoController;
  final VoidCallback onTap;
  final bool isPaused;

  const VideoPlayerWidget({
    Key? key,
    required this.videoController,
    required this.onTap,
    required this.isPaused,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Stack(
        alignment: Alignment.center,
        children: [
          videoController.value.isInitialized
              ? Center(
            child: AspectRatio(
              aspectRatio: videoController.value.aspectRatio > 1
                  ? videoController.value.aspectRatio // Maintain aspect ratio for horizontal videos
                  : 9 / 16, // Use full screen for vertical videos
              child: VideoPlayer(videoController),
            ),
          )
              : Center(child: CircularProgressIndicator()),
        ],
      ),
    );
  }
}
